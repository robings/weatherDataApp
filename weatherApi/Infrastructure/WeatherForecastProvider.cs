using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using weatherApi.Models;
using weatherApi.Models.SiteListResponse;

namespace weatherApi.Infrastructure
{
	public class WeatherForecastProvider : IWeatherForecastProvider
	{
        private readonly WeatherForecastOptions _options;
        private IClock _clock;
        private Dictionary<string, CachedWeatherForecastResponse> _cachedWeatherForecastResponses;
        private CachedSiteListResponse _cachedSiteListResponse;
        private static HttpClient _httpClient;

        public WeatherForecastProvider(IOptions<WeatherForecastOptions> options, IClock clock, HttpClient httpClient)
		{
            _options = options.Value;
            _httpClient = httpClient;
            _cachedWeatherForecastResponses = new Dictionary<string, CachedWeatherForecastResponse>();
            _cachedSiteListResponse = null;
            _clock = clock;
        }

        public async Task<WeatherForecastResponse> GetForecastAsync()
        {
            var cachedResponseAvailable = _cachedWeatherForecastResponses.TryGetValue(_options.LocationId, out var cachedWeatherForecastResponse);

            if (cachedResponseAvailable && cachedWeatherForecastResponse.LastReceived.AddMinutes(_options.CacheRefreshInMinutes) > _clock.Now())
            {
                return cachedWeatherForecastResponse.Forecast;
            }

            var response = await _httpClient.GetStreamAsync($"val/wxfcs/all/json/{_options.LocationId}?res=3hourly&key={_options.Key}");
            var forecast = await JsonSerializer.DeserializeAsync<WeatherForecastResponse>(response);

            var newCachedWeatherForecastResponse = new CachedWeatherForecastResponse
            {
                Forecast = forecast,
                LastReceived = _clock.Now(),
            };

            _cachedWeatherForecastResponses.Remove(_options.LocationId);

            _cachedWeatherForecastResponses.Add(_options.LocationId, newCachedWeatherForecastResponse);

            return forecast;
        }

        public async Task<SiteListResponse> GetSiteListAsync()
        {
            var cachedResponseAvailable = _cachedSiteListResponse != null;

            if (cachedResponseAvailable && _cachedSiteListResponse.LastReceived.AddDays(1).Date > _clock.Now().Date)
            {
                return _cachedSiteListResponse.SiteListResponse;
            }

            var response = await _httpClient.GetStreamAsync($"val/wxfcs/all/json/sitelist?key={_options.Key}");
            var siteList = await JsonSerializer.DeserializeAsync<SiteListResponse>(response);

            var newCachedSiteListResponse = new CachedSiteListResponse
            {
                SiteListResponse = siteList,
                LastReceived = _clock.Now(),
            };

            _cachedSiteListResponse = newCachedSiteListResponse;

            return siteList;
        }
    }
}
