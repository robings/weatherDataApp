using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using weatherApi.Infrastructure;

namespace weatherApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IWeatherForecastProvider _weatherForecastProvider;
        private readonly IWeatherForecastConvertor _weatherForecastConvertor;

        public WeatherForecastController(
            IConfiguration config,
            IWeatherForecastProvider weatherForecastProvider,
            IWeatherForecastConvertor weatherForecastConvertor)
        {
            _config = config;
            _weatherForecastProvider = weatherForecastProvider;
            _weatherForecastConvertor = weatherForecastConvertor;
        }

        [HttpGet]
        public async Task<object> GetForecast()
        {
            var clock = new Clock(() => DateTime.Now);

            var key = _config["Key"];
            var locationId = _config["LocationId"];
            var forecast = await _weatherForecastProvider.GetForecastAsync();

            var converted = _weatherForecastConvertor.Convert(forecast, locationId);

            return converted;
        }
    }
}
