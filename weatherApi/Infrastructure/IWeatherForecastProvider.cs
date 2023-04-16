using System.Threading.Tasks;
using weatherApi.Models;
using weatherApi.Models.SiteListResponse;

namespace weatherApi.Infrastructure
{
	public interface IWeatherForecastProvider
	{
		public Task<WeatherForecastResponse> GetForecastAsync(string locationId);

		public Task<SiteListResponse> GetSiteListAsync();
	}
}
