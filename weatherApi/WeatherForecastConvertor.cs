﻿using System;
using System.Collections.Generic;
using System.Linq;
using weatherApi.Models;

namespace weatherApi
{
    public static class WeatherForecastConvertor
    {
        static ReferenceData reference = new();

        public static WeatherForecastResponseForUI Convert(WeatherForecastResponse forecast, string locationId)
        {
            List<DayData> dayData = forecast.SiteRep.DV.Location.Period.Select((period) => {
                return new DayData
                {
                    Date = period.value,
                    ThreeHourlyForecasts = GetThreeHourlyForecasts(period.Rep, forecast.SiteRep.Wx),
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

        internal static List<ThreeHourlyForecast> GetThreeHourlyForecasts(List<Rep> reps, Wx wx)
        {
            return reps.Select((rep) => {
                ( string startTime, string endTime ) = GetStartAndEndTime(rep.Name);

                return new ThreeHourlyForecast
                {
                    Start = startTime,
                    End = endTime,
                    ForecastElements = GetForecastElements(rep, wx),
                };
            }).ToList();
        }

        internal static List<ForecastElement> GetForecastElements(Rep rep, Wx wx)
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

        internal static ForecastElement GetForecastElement(Rep rep, Wx wx, string parameter) {
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

        internal static (string startTime, string endTime) GetStartAndEndTime(string timeInMinutes)
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
    }
}
