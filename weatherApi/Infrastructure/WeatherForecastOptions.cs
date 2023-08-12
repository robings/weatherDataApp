using System;
namespace weatherApi.Infrastructure
{
	public class WeatherForecastOptions
	{
		public const string WeatherForecastProvider = "WeatherForecastProvider";

		public string BaseURL { get; set; }
		public string Key { get; set; }
		public string LocationId { get; set; }
		public double CacheRefreshInMinutes { get; set; }
    }
}

