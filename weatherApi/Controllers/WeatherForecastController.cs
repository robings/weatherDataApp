using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using weatherApi.Infrastructure;
using Microsoft.Extensions.Options;

namespace weatherApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly WeatherForecastOptions _options;
        private readonly IWeatherForecastProvider _weatherForecastProvider;
        private readonly IWeatherForecastConvertor _weatherForecastConvertor;
        private readonly ISiteListConvertor _siteListConvertor;

        public WeatherForecastController(
            IOptions<WeatherForecastOptions> options,
            IWeatherForecastProvider weatherForecastProvider,
            IWeatherForecastConvertor weatherForecastConvertor,
            ISiteListConvertor siteListConvertor)
        {
            _options = options.Value;
            _weatherForecastProvider = weatherForecastProvider;
            _weatherForecastConvertor = weatherForecastConvertor;
            _siteListConvertor = siteListConvertor;
        }

        [HttpGet]
        public async Task<IResult> GetForecast()
        {
            var locationId = _options.LocationId;
            var forecast = await _weatherForecastProvider.GetForecastAsync();

            var converted = _weatherForecastConvertor.Convert(forecast, locationId);

            return TypedResults.Ok(converted);
        }

        [HttpGet("sites")]
        public async Task<IResult> GetSiteList()
        {
            var siteList = await _weatherForecastProvider.GetSiteListAsync();

            var converted = _siteListConvertor.ConvertSiteList(siteList);

            return TypedResults.Ok(converted);
        }
    }
}
