using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using weatherApi.Models;

namespace weatherApi.Infrastructure
{
	public class WeatherForecastProvider : IWeatherForecastProvider
	{
        private readonly WeatherForecastProviderOptions _options;
        private IClock _clock;
        private Dictionary<string, CachedWeatherForecastResponse> _cachedWeatherForecastResponses;
        private static HttpClient _httpClient;

        public WeatherForecastProvider(IOptions<WeatherForecastProviderOptions> options, IClock clock, HttpClient httpClient)
		{
            _options = options.Value;
            _httpClient = httpClient;
            _cachedWeatherForecastResponses = new Dictionary<string, CachedWeatherForecastResponse>();
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
    }
}
