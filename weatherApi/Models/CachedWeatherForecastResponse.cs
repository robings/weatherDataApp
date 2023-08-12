using System;

namespace weatherApi.Models
{
    public class CachedWeatherForecastResponse
    {
        public DateTime LastReceived { get; set; }

        public WeatherForecastResponse Forecast { get; set; }
    }
}
