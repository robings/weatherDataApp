using System.Collections.Generic;

namespace weatherApi.Models
{
    public class WeatherForecastResponseForUI
    {
        public string DateTimeOfForecast { get; set; }
        public string LocationId { get; set; }
        public string Location { get; set; }
        public List<DayData> DayData { get; set; }
    }

    public class DayData
    {
        public string Date { get; set; }
        public List<ThreeHourlyForecast> ThreeHourlyForecasts { get; set; }
    }

    public class ThreeHourlyForecast
    {
        public string Start { get; set; }
        public string End { get; set; }
        public List<ForecastElement> ForecastElements { get; set; }
    }

    public class ForecastElement
    {
        public string Type { get; set; }
        public string Units { get; set; }
        public string Value { get; set; }
    }
}
