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
        private CacheStorage _cacheStorage;
        private static HttpClient _httpClient;

        public WeatherForecastProvider(IOptions<WeatherForecastOptions> options, IClock clock, HttpClient httpClient, CacheStorage cacheStorage)
		{
            _options = options.Value;
            _httpClient = httpClient;
            _cacheStorage = cacheStorage;
            _clock = clock;
        }

        public async Task<WeatherForecastResponse> GetForecastAsync(string locationId)
        {
            var cachedResponse = _cacheStorage.GetForecast(locationId);

            if (cachedResponse != null && cachedResponse.LastReceived.AddMinutes(_options.CacheRefreshInMinutes) > _clock.Now())
            {
                return cachedResponse.Forecast;
            }

            var response = await _httpClient.GetStreamAsync($"val/wxfcs/all/json/{locationId}?res=3hourly&key={_options.Key}");
            var forecast = await JsonSerializer.DeserializeAsync<WeatherForecastResponse>(response);

            var newCachedWeatherForecastResponse = new CachedWeatherForecastResponse
            {
                Forecast = forecast,
                LastReceived = _clock.Now(),
            };

            _cacheStorage.RemoveForecast(locationId);

            _cacheStorage.AddForecast(locationId, newCachedWeatherForecastResponse);

            return forecast;
        }

        public async Task<SiteListResponse> GetSiteListAsync()
        {
            var cachedResponse = _cacheStorage.GetSiteListResponse();

            if (cachedResponse != null && cachedResponse.LastReceived.AddDays(1).Date > _clock.Now().Date)
            {
                return cachedResponse.SiteListResponse;
            }

            var response = await _httpClient.GetStreamAsync($"val/wxfcs/all/json/sitelist?key={_options.Key}");
            var siteList = await JsonSerializer.DeserializeAsync<SiteListResponse>(response);

            var newCachedSiteListResponse = new CachedSiteListResponse
            {
                SiteListResponse = siteList,
                LastReceived = _clock.Now(),
            };

            _cacheStorage.SetCachedSiteListResponse(newCachedSiteListResponse);

            return siteList;
        }
    }
}
