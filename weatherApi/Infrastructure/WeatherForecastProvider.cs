using System;
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
        private static HttpClient _httpClient;

        public WeatherForecastProvider(IConfiguration config)
		{
            _config = config;
            _httpClient = new HttpClient
            {
                BaseAddress = new Uri(_config["BaseURL"])
            };
        }

        public async Task<WeatherForecastResponse> GetForecastAsync()
        {
            var key = _config["Key"];
            var locationId = _config["LocationId"];
            var response = await _httpClient.GetStreamAsync($"val/wxfcs/all/json/{locationId}?res=3hourly&key={key}");

            return await JsonSerializer.DeserializeAsync<WeatherForecastResponse>(response);
        }
    }
}

