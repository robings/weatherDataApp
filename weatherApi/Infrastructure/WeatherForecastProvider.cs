using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using weatherApi.Models;

namespace weatherApi.Infrastructure
{
	public class WeatherForecastProvider : IWeatherForecastProvider
	{
        private readonly IConfiguration _config;
        private readonly string _key;
        private readonly string _locationId;
        private readonly double _cacheRefreshInMinutes;
        private IClock _clock;
        private Dictionary<string, CachedWeatherForecastResponse> _cachedWeatherForecastResponses;
        private static HttpClient _httpClient;

        public WeatherForecastProvider(IConfiguration config, IClock clock)
		{
            _config = config;
            _key = _config["Key"];
            _locationId = _config["LocationId"];
            _cacheRefreshInMinutes = double.Parse(_config["CacheRefreshInMinutes"]);
            _httpClient = new HttpClient
            {
                BaseAddress = new Uri(_config["BaseURL"])
            };
            _cachedWeatherForecastResponses = new Dictionary<string, CachedWeatherForecastResponse>();
            _clock = clock;
        }

        public async Task<WeatherForecastResponse> GetForecastAsync()
        {
            var cachedResponseAvailable = _cachedWeatherForecastResponses.TryGetValue(_locationId, out var cachedWeatherForecastResponse);

            if (cachedResponseAvailable && cachedWeatherForecastResponse.LastReceived.AddMinutes(_cacheRefreshInMinutes) > _clock.Now())
            {
                return cachedWeatherForecastResponse.Forecast;
            }

            var response = await _httpClient.GetStreamAsync($"val/wxfcs/all/json/{_locationId}?res=3hourly&key={_key}");
            var forecast = await JsonSerializer.DeserializeAsync<WeatherForecastResponse>(response);

            var newCachedWeatherForecastResponse = new CachedWeatherForecastResponse
            {
                Forecast = forecast,
                LastReceived = _clock.Now(),
            };

            _cachedWeatherForecastResponses.Remove(_locationId);

            _cachedWeatherForecastResponses.Add(_locationId, newCachedWeatherForecastResponse);

            return forecast;
        }
    }
}
