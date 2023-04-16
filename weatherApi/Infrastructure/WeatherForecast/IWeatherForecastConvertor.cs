using weatherApi.Models;

namespace weatherApi.Infrastructure
{
	public interface IWeatherForecastConvertor
	{
        WeatherForecastResponseForUI Convert(WeatherForecastResponse forecast, string locationId);
    }
}
