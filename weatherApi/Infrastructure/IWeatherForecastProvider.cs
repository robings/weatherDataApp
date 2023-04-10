using System.Threading.Tasks;
using weatherApi.Models;

namespace weatherApi.Infrastructure
{
	public interface IWeatherForecastProvider
	{
		public Task<WeatherForecastResponse> GetForecastAsync();
	}
}
