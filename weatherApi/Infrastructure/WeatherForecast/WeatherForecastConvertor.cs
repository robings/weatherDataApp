using System;
using System.Collections.Generic;
using System.Linq;
using weatherApi.Models;

namespace weatherApi.Infrastructure
{
    public class WeatherForecastConvertor : IWeatherForecastConvertor
    {
        private IClock _clock;

        public WeatherForecastConvertor(IClock clock)
        {
            _clock = clock;
        }

        static ReferenceData reference = new();

        public WeatherForecastResponseForUI Convert(WeatherForecastResponse forecast, string locationId)
        {
            List<DayData> dayData = forecast.SiteRep.DV.Location.Period.Select((period) =>
            {
                return new DayData
                {
                    Date = period.value,
                    ThreeHourlyForecasts = GetThreeHourlyForecasts(period.Rep, forecast.SiteRep.Wx, period.value),
                };
            }).ToList();

            var weatherForecastForUI = new WeatherForecastResponseForUI
            {
                DateTimeOfForecast = forecast.SiteRep.DV.dataDate,
                LocationId = locationId,
                Location = forecast.SiteRep.DV.Location.name,
                DayData = dayData,
            };

            return weatherForecastForUI;
        }

        private List<ThreeHourlyForecast> GetThreeHourlyForecasts(List<Rep> reps, Wx wx, string date)
        {
            var convertedDate = DateTime.Parse(date).Date;
            var currentDateTime = _clock.Now();

            var threeHourlyForecasts = reps.Select((rep) =>
            {
                (string startTime, string endTime) = GetStartAndEndTime(rep.Name);

                return new ThreeHourlyForecast
                {
                    Start = startTime,
                    End = endTime,
                    ForecastElements = GetForecastElements(rep, wx),
                };
            }).ToList();

            var forecastsInThePast = threeHourlyForecasts.Where(rep => DetermineIfForecastInPast(rep, currentDateTime, convertedDate));

            return threeHourlyForecasts.Where(rep => forecastsInThePast.All(forecast => forecast != rep)).ToList();
        }

        private List<ForecastElement> GetForecastElements(Rep rep, Wx wx)
        {
            var forecastElementsList = new List<ForecastElement>();

            forecastElementsList.Add(GetForecastElement(rep, wx, "D"));
            forecastElementsList.Add(GetForecastElement(rep, wx, "F"));
            forecastElementsList.Add(GetForecastElement(rep, wx, "G"));
            forecastElementsList.Add(GetForecastElement(rep, wx, "H"));
            forecastElementsList.Add(GetForecastElement(rep, wx, "Pp"));
            forecastElementsList.Add(GetForecastElement(rep, wx, "S"));
            forecastElementsList.Add(GetForecastElement(rep, wx, "T"));
            forecastElementsList.Add(GetForecastElement(rep, wx, "V"));
            forecastElementsList.Add(GetForecastElement(rep, wx, "W"));
            forecastElementsList.Add(GetForecastElement(rep, wx, "U"));

            return forecastElementsList;
        }

        private ForecastElement GetForecastElement(Rep rep, Wx wx, string parameter)
        {
            var forecastElement = new ForecastElement
            {
                Type = wx.Param.Find(param => param.name == parameter).ReadableName,
                Units = wx.Param.Find(param => param.name == parameter).units,
                Value = (string)typeof(Rep).GetProperty(parameter).GetValue(rep, null),
            };

            if (parameter == "V")
            {
                var convertedValue = reference.Visability[forecastElement.Value];
                forecastElement.Value = convertedValue;
            }

            if (parameter == "W")
            {
                var convertedValue = reference.WeatherType[forecastElement.Value];
                forecastElement.Value = convertedValue;
            }

            return forecastElement;
        }

        private (string startTime, string endTime) GetStartAndEndTime(string timeInMinutes)
        {
            var startTimeInMins = int.Parse(timeInMinutes);
            var startTime = startTimeInMins == 0 ? startTimeInMins : startTimeInMins / 60;
            var endTime = startTime + 3;
            var startTimeDisplay = "00:00";
            var endTimeDisplay = "00:00";
            if (startTime > 0)
            {
                startTimeDisplay = startTime < 10 ? $"0{startTime}:00" : $"{startTime}:00";
            }

            if (endTime > 0 && endTime < 24)
            {
                endTimeDisplay = endTime < 10 ? $"0{endTime}:00" : $"{endTime}:00";
            }

            if (endTime == 24)
            {
                endTimeDisplay = "00:00";
            }

            return (startTimeDisplay, endTimeDisplay);
        }

        private bool DetermineIfForecastInPast(ThreeHourlyForecast forecast, DateTime currentDateTime, DateTime forecastDate)
        {
            var endTimeString = forecast.End == "00:00" ? "23:59:59" : forecast.End;
            var endTime = DateTime.Parse(endTimeString);
            var endDateTime = new DateTime(forecastDate.Year, forecastDate.Month, forecastDate.Day, endTime.Hour, endTime.Minute, endTime.Second);

            return endDateTime < currentDateTime;
        }
    }
}
