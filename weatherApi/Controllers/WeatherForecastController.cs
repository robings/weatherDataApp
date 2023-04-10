using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using weatherApi.Infrastructure;
using weatherApi.Models;

namespace weatherApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IConfiguration _config;
        private IWeatherForecastConvertor _weatherForecastConvertor;
        private static HttpClient _httpClient;

        public WeatherForecastController(IConfiguration config, IWeatherForecastConvertor weatherForecastConvertor)
        {
            _config = config;
            _weatherForecastConvertor = weatherForecastConvertor;
            _httpClient = new HttpClient
            {
                BaseAddress = new Uri(_config["BaseURL"])
            };
        }

        [HttpGet]
        public async Task<object> Get()
        {
            var clock = new Clock(() => DateTime.Now);

            var key = _config["Key"];
            var locationId = _config["LocationId"];
            var response = await _httpClient.GetStreamAsync($"val/wxfcs/all/json/{locationId}?res=3hourly&key={key}");

            var deserialized = await JsonSerializer.DeserializeAsync<WeatherForecastResponse>(response);
            var converted = _weatherForecastConvertor.Convert(deserialized, locationId);

            return converted;
        }
    }
}
