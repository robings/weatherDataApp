using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using NUnit.Framework;
using weatherApi.Infrastructure;
using weatherApi.Models;

namespace weatherApi.tests
{
    public class Tests
    {
        public WeatherForecastResponse sampleWeatherForecastResponse;
        public WeatherForecastResponseForUI expectedWeatherForecast;
        public string locationId = "30010";


        [SetUp]
        public void SetUp()
        {
            sampleWeatherForecastResponse = JsonSerializer.Deserialize<WeatherForecastResponse>(File.ReadAllText("./sampleApiResponse.json"));
            expectedWeatherForecast = new()
            {
                DateTimeOfForecast = sampleWeatherForecastResponse.SiteRep.DV.dataDate,
                DayData = new List<DayData> {
                    new DayData
                    {
                        Date = "2022-02-19Z",
                        ThreeHourlyForecasts = new List<ThreeHourlyForecast>
                        {
                            new ThreeHourlyForecast
                            {
                                End = "21:00",
                                ForecastElements = new List<ForecastElement>
                                {
                                    new ForecastElement { Type = "Wind Direction", Units = "compass", Value = "W" },
                                    new ForecastElement { Type = "Feels Like Temperature", Units = "C", Value = "5" },
                                    new ForecastElement { Type = "Wind Gust", Units = "mph", Value = "29" },
                                    new ForecastElement { Type = "Screen Relative Humidity", Units = "%", Value = "85" },
                                    new ForecastElement { Type = "Precipitation Probability", Units = "%", Value = "6" },
                                    new ForecastElement { Type = "Wind Speed", Units = "mph", Value = "11" },
                                    new ForecastElement { Type = "Temperature", Units = "C", Value = "8" },
                                    new ForecastElement { Type = "Visibility", Units = "", Value = "Good 10-20 km" },
                                    new ForecastElement { Type = "Weather Type", Units = "", Value = "Cloudy" },
                                    new ForecastElement { Type = "Max UV Index", Units = "", Value = "0" },
                                },
                                Start = "18:00",
                            },
                            new ThreeHourlyForecast
                            {
                                End = "00:00",
                                ForecastElements = new List<ForecastElement>
                                {
                                    new ForecastElement { Type = "Wind Direction", Units = "compass", Value = "WSW" },
                                    new ForecastElement { Type = "Feels Like Temperature", Units = "C", Value = "4" },
                                    new ForecastElement { Type = "Wind Gust", Units = "mph", Value = "22" },
                                    new ForecastElement { Type = "Screen Relative Humidity", Units = "%", Value = "95" },
                                    new ForecastElement { Type = "Precipitation Probability", Units = "%", Value = "62" },
                                    new ForecastElement { Type = "Wind Speed", Units = "mph", Value = "13" },
                                    new ForecastElement { Type = "Temperature", Units = "C", Value = "7" },
                                    new ForecastElement { Type = "Visibility", Units = "", Value = "Moderate 4-10 km" },
                                    new ForecastElement { Type = "Weather Type", Units = "", Value = "Light rain" },
                                    new ForecastElement { Type = "Max UV Index", Units = "", Value = "0" },
                                },
                                Start = "21:00",
                            },
                        },
                    },
                    new DayData
                    {
                        Date = "2022-02-20Z",
                        ThreeHourlyForecasts = new List<ThreeHourlyForecast>
                        {
                            new ThreeHourlyForecast
                            {
                                End = "03:00",
                                ForecastElements = new List<ForecastElement>
                                {
                                    new ForecastElement { Type = "Wind Direction", Units = "compass", Value = "WSW" },
                                    new ForecastElement { Type = "Feels Like Temperature", Units = "C", Value = "5" },
                                    new ForecastElement { Type = "Wind Gust", Units = "mph", Value = "29" },
                                    new ForecastElement { Type = "Screen Relative Humidity", Units = "%", Value = "95" },
                                    new ForecastElement { Type = "Precipitation Probability", Units = "%", Value = "62" },
                                    new ForecastElement { Type = "Wind Speed", Units = "mph", Value = "16" },
                                    new ForecastElement { Type = "Temperature", Units = "C", Value = "9" },
                                    new ForecastElement { Type = "Visibility", Units = "", Value = "Very good 20-40 km" },
                                    new ForecastElement { Type = "Weather Type", Units = "", Value = "Overcast" },
                                    new ForecastElement { Type = "Max UV Index", Units = "", Value = "0" },
                                },
                                Start = "00:00",
                            },
                            new ThreeHourlyForecast
                            {
                                End = "06:00",
                                ForecastElements = new List<ForecastElement>
                                {
                                    new ForecastElement { Type = "Wind Direction", Units = "compass", Value = "WSW" },
                                    new ForecastElement { Type = "Feels Like Temperature", Units = "C", Value = "4" },
                                    new ForecastElement { Type = "Wind Gust", Units = "mph", Value = "34" },
                                    new ForecastElement { Type = "Screen Relative Humidity", Units = "%", Value = "90" },
                                    new ForecastElement { Type = "Precipitation Probability", Units = "%", Value = "13" },
                                    new ForecastElement { Type = "Wind Speed", Units = "mph", Value = "18" },
                                    new ForecastElement { Type = "Temperature", Units = "C", Value = "9" },
                                    new ForecastElement { Type = "Visibility", Units = "", Value = "Excellent < 40 km" },
                                    new ForecastElement { Type = "Weather Type", Units = "", Value = "Overcast" },
                                    new ForecastElement { Type = "Max UV Index", Units = "", Value = "0" },
                                },
                                Start = "03:00",
                            },
                            new ThreeHourlyForecast
                            {
                                End = "09:00",
                                ForecastElements = new List<ForecastElement>
                                {
                                    new ForecastElement { Type = "Wind Direction", Units = "compass", Value = "WSW" },
                                    new ForecastElement { Type = "Feels Like Temperature", Units = "C", Value = "5" },
                                    new ForecastElement { Type = "Wind Gust", Units = "mph", Value = "36" },
                                    new ForecastElement { Type = "Screen Relative Humidity", Units = "%", Value = "91" },
                                    new ForecastElement { Type = "Precipitation Probability", Units = "%", Value = "82" },
                                    new ForecastElement { Type = "Wind Speed", Units = "mph", Value = "20" },
                                    new ForecastElement { Type = "Temperature", Units = "C", Value = "9" },
                                    new ForecastElement { Type = "Visibility", Units = "", Value = "Good 10-20 km" },
                                    new ForecastElement { Type = "Weather Type", Units = "", Value = "Heavy rain" },
                                    new ForecastElement { Type = "Max UV Index", Units = "", Value = "0" },
                                },
                                Start = "06:00",
                            },
                            new ThreeHourlyForecast
                            {
                                End = "12:00",
                                ForecastElements = new List<ForecastElement>
                                {
                                    new ForecastElement { Type = "Wind Direction", Units = "compass", Value = "WSW" },
                                    new ForecastElement { Type = "Feels Like Temperature", Units = "C", Value = "5" },
                                    new ForecastElement { Type = "Wind Gust", Units = "mph", Value = "36" },
                                    new ForecastElement { Type = "Screen Relative Humidity", Units = "%", Value = "91" },
                                    new ForecastElement { Type = "Precipitation Probability", Units = "%", Value = "53" },
                                    new ForecastElement { Type = "Wind Speed", Units = "mph", Value = "20" },
                                    new ForecastElement { Type = "Temperature", Units = "C", Value = "9" },
                                    new ForecastElement { Type = "Visibility", Units = "", Value = "Very good 20-40 km" },
                                    new ForecastElement { Type = "Weather Type", Units = "", Value = "Light rain" },
                                    new ForecastElement { Type = "Max UV Index", Units = "", Value = "1" },
                                },
                                Start = "09:00",
                            },
                            new ThreeHourlyForecast
                            {
                                End = "15:00",
                                ForecastElements = new List<ForecastElement>
                                {
                                    new ForecastElement { Type = "Wind Direction", Units = "compass", Value = "WSW" },
                                    new ForecastElement { Type = "Feels Like Temperature", Units = "C", Value = "6" },
                                    new ForecastElement { Type = "Wind Gust", Units = "mph", Value = "38" },
                                    new ForecastElement { Type = "Screen Relative Humidity", Units = "%", Value = "94" },
                                    new ForecastElement { Type = "Precipitation Probability", Units = "%", Value = "55" },
                                    new ForecastElement { Type = "Wind Speed", Units = "mph", Value = "20" },
                                    new ForecastElement { Type = "Temperature", Units = "C", Value = "10" },
                                    new ForecastElement { Type = "Visibility", Units = "", Value = "Good 10-20 km" },
                                    new ForecastElement { Type = "Weather Type", Units = "", Value = "Light rain" },
                                    new ForecastElement { Type = "Max UV Index", Units = "", Value = "1" },
                                },
                                Start = "12:00",
                            },
                            new ThreeHourlyForecast
                            {
                                End = "18:00",
                                ForecastElements = new List<ForecastElement>
                                {
                                    new ForecastElement { Type = "Wind Direction", Units = "compass", Value = "WSW" },
                                    new ForecastElement { Type = "Feels Like Temperature", Units = "C", Value = "5" },
                                    new ForecastElement { Type = "Wind Gust", Units = "mph", Value = "47" },
                                    new ForecastElement { Type = "Screen Relative Humidity", Units = "%", Value = "93" },
                                    new ForecastElement { Type = "Precipitation Probability", Units = "%", Value = "96" },
                                    new ForecastElement { Type = "Wind Speed", Units = "mph", Value = "25" },
                                    new ForecastElement { Type = "Temperature", Units = "C", Value = "10" },
                                    new ForecastElement { Type = "Visibility", Units = "", Value = "Good 10-20 km" },
                                    new ForecastElement { Type = "Weather Type", Units = "", Value = "Heavy rain" },
                                    new ForecastElement { Type = "Max UV Index", Units = "", Value = "1" },
                                },
                                Start = "15:00",
                            },
                            new ThreeHourlyForecast
                            {
                                End = "21:00",
                                ForecastElements = new List<ForecastElement>
                                {
                                    new ForecastElement { Type = "Wind Direction", Units = "compass", Value = "W" },
                                    new ForecastElement { Type = "Feels Like Temperature", Units = "C", Value = "2" },
                                    new ForecastElement { Type = "Wind Gust", Units = "mph", Value = "45" },
                                    new ForecastElement { Type = "Screen Relative Humidity", Units = "%", Value = "84" },
                                    new ForecastElement { Type = "Precipitation Probability", Units = "%", Value = "95" },
                                    new ForecastElement { Type = "Wind Speed", Units = "mph", Value = "25" },
                                    new ForecastElement { Type = "Temperature", Units = "C", Value = "7" },
                                    new ForecastElement { Type = "Visibility", Units = "", Value = "Very good 20-40 km" },
                                    new ForecastElement { Type = "Weather Type", Units = "", Value = "Heavy rain shower (night)" },
                                    new ForecastElement { Type = "Max UV Index", Units = "", Value = "0" },
                                },
                                Start = "18:00",
                            },
                            new ThreeHourlyForecast
                            {
                                End = "00:00",
                                ForecastElements = new List<ForecastElement>
                                {
                                    new ForecastElement { Type = "Wind Direction", Units = "compass", Value = "WNW" },
                                    new ForecastElement { Type = "Feels Like Temperature", Units = "C", Value = "-3" },
                                    new ForecastElement { Type = "Wind Gust", Units = "mph", Value = "40" },
                                    new ForecastElement { Type = "Screen Relative Humidity", Units = "%", Value = "75" },
                                    new ForecastElement { Type = "Precipitation Probability", Units = "%", Value = "44" },
                                    new ForecastElement { Type = "Wind Speed", Units = "mph", Value = "20" },
                                    new ForecastElement { Type = "Temperature", Units = "C", Value = "4" },
                                    new ForecastElement { Type = "Visibility", Units = "", Value = "Excellent < 40 km" },
                                    new ForecastElement { Type = "Weather Type", Units = "", Value = "Light rain shower (night)" },
                                    new ForecastElement { Type = "Max UV Index", Units = "", Value = "0" },
                                },
                                Start = "21:00",
                            },
                        },
                    },
                                        new DayData
                    {
                        Date = "2022-02-21Z",
                        ThreeHourlyForecasts = new List<ThreeHourlyForecast>
                        {
                            new ThreeHourlyForecast
                            {
                                End = "03:00",
                                ForecastElements = new List<ForecastElement>
                                {
                                    new ForecastElement { Type = "Wind Direction", Units = "compass", Value = "W" },
                                    new ForecastElement { Type = "Feels Like Temperature", Units = "C", Value = "-3" },
                                    new ForecastElement { Type = "Wind Gust", Units = "mph", Value = "40" },
                                    new ForecastElement { Type = "Screen Relative Humidity", Units = "%", Value = "81" },
                                    new ForecastElement { Type = "Precipitation Probability", Units = "%", Value = "83" },
                                    new ForecastElement { Type = "Wind Speed", Units = "mph", Value = "20" },
                                    new ForecastElement { Type = "Temperature", Units = "C", Value = "4" },
                                    new ForecastElement { Type = "Visibility", Units = "", Value = "Excellent < 40 km" },
                                    new ForecastElement { Type = "Weather Type", Units = "", Value = "Light rain" },
                                    new ForecastElement { Type = "Max UV Index", Units = "", Value = "0" },
                                },
                                Start = "00:00",
                            },
                        },
                    },
                },
                Location = sampleWeatherForecastResponse.SiteRep.DV.Location.name,
                LocationId = locationId,
            };
        }

        [Test]
        public void WeatherForecastConvertor_ConvertsWeatherForecastAsExpected()
        {
            var clock = new Clock(() => new System.DateTime(2022, 02, 19, 18, 10, 00));
            var weatherForecastConvertor = new WeatherForecastConvertor(clock);

            var convertedForecast = weatherForecastConvertor.Convert(sampleWeatherForecastResponse, locationId);

            var JSONexpectedForecast = JsonSerializer.Serialize(expectedWeatherForecast);
            var JSONconvertedForecast = JsonSerializer.Serialize(convertedForecast);

            Assert.That(JSONconvertedForecast, Is.EqualTo(JSONexpectedForecast));
        }

        [Test]
        public void WeatherForecastConvertor_WhereDataIsReturnedForTimePriorToCurrentTime_RemovesDataFromResponse()
        {
            var clock = new Clock(() => new System.DateTime(2022, 02, 19, 21, 10, 00));
            var weatherForecastConvertor = new WeatherForecastConvertor(clock);

            var convertedForecast = weatherForecastConvertor.Convert(sampleWeatherForecastResponse, locationId);
            var filteredExpectedForecast = expectedWeatherForecast;
            var secondThreeHourlyForecastFirstDay = expectedWeatherForecast.DayData[0].ThreeHourlyForecasts[1];
            filteredExpectedForecast.DayData[0].ThreeHourlyForecasts = new List<ThreeHourlyForecast>
            {
                secondThreeHourlyForecastFirstDay,
            };

            var JSONexpectedForecast = JsonSerializer.Serialize(filteredExpectedForecast);
            var JSONconvertedForecast = JsonSerializer.Serialize(convertedForecast);

            Assert.That(JSONconvertedForecast, Is.EqualTo(JSONexpectedForecast));
        }
    }
}
