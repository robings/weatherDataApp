using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using weatherApi.Infrastructure;
using Microsoft.Extensions.Options;
using weatherApi.Infrastructure.SiteList;

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
        private readonly ISiteListSearcher _siteListSearcher;

        public WeatherForecastController(
            IOptions<WeatherForecastOptions> options,
            IWeatherForecastProvider weatherForecastProvider,
            IWeatherForecastConvertor weatherForecastConvertor,
            ISiteListConvertor siteListConvertor,
            ISiteListSearcher siteListSearcher)
        {
            _options = options.Value;
            _weatherForecastProvider = weatherForecastProvider;
            _weatherForecastConvertor = weatherForecastConvertor;
            _siteListConvertor = siteListConvertor;
            _siteListSearcher = siteListSearcher;
        }

        [HttpGet]
        public async Task<IResult> GetForecast(
            [FromQuery] string locationId)
        {
            if (locationId is null)
            {
                locationId = _options.LocationId;
            }

            var forecast = await _weatherForecastProvider.GetForecastAsync(locationId);

            var converted = _weatherForecastConvertor.Convert(forecast, locationId);

            return TypedResults.Ok(converted);
        }

        [HttpGet("sites")]
        public async Task<IResult> GetSiteList(
            [FromQuery] string searchString)
        {
            var siteList = await _weatherForecastProvider.GetSiteListAsync();

            var filterSiteList = _siteListSearcher.SearchSiteList(siteList, searchString);

            var converted = _siteListConvertor.ConvertSiteList(siteList);

            return TypedResults.Ok(converted);
        }
    }
}
