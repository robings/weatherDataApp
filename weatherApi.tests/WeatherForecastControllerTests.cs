using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Options;
using NSubstitute;
using NUnit.Framework;
using weatherApi.Controllers;
using weatherApi.Infrastructure;
using weatherApi.Infrastructure.SiteList;
using weatherApi.Models;
using weatherApi.Models.SiteListResponse;

namespace weatherApi.tests
{
	public class WeatherForecastControllerTests
	{
        private WeatherForecastOptions _options;
		private IWeatherForecastConvertor _mockWeatherForecastConvertor;
        private ISiteListConvertor _mockSiteListConvertor;
		private IWeatherForecastProvider _mockWeatherForecastProvider;
        private ISiteListSearcher _mockSiteListSearcher;

		private WeatherForecastController _weatherForecastController;

        [SetUp]
		public void Setup()
		{
			_options = new WeatherForecastOptions
            {
                BaseURL = "http://baseurl/",
                Key = "TestKey",
                LocationId = "1",
                CacheRefreshInMinutes = 1,
            };

            var iOptions = Options.Create<WeatherForecastOptions>(_options);

            _mockWeatherForecastConvertor = Substitute.For<IWeatherForecastConvertor>();
			_mockWeatherForecastProvider = Substitute.For<IWeatherForecastProvider>();

            _mockSiteListConvertor = Substitute.For<ISiteListConvertor>();
            _mockSiteListSearcher = Substitute.For<ISiteListSearcher>();

			_weatherForecastController = new WeatherForecastController(
				iOptions,
				_mockWeatherForecastProvider,
				_mockWeatherForecastConvertor,
                _mockSiteListConvertor,
                _mockSiteListSearcher);
        }

		[Test]
		public async Task GetForecast_ReturnsOk_WithForecast()
		{
			var UIWeatherForecast = new WeatherForecastResponseForUI
			{
				LocationId = "1",
				DateTimeOfForecast = DateTime.Now.Date.ToShortDateString(),
			};

            var locationId = "2";

            _mockWeatherForecastConvertor.Convert(Arg.Any<WeatherForecastResponse>(), locationId)
				.Returns(UIWeatherForecast);

			var response = await _weatherForecastController.GetForecast(locationId);

			Assert.That(response, Is.TypeOf<Ok<WeatherForecastResponseForUI>>());

			var result = (Ok<WeatherForecastResponseForUI>)response;

			Assert.That(result.StatusCode, Is.EqualTo(200));
			Assert.That(result.Value, Is.EqualTo(UIWeatherForecast));
		}

        [Test]
        public async Task GetForecast_WhereLocationIdIsNull_ReturnsOk_WithForecastForLocationInOptions()
        {
            var UIWeatherForecast = new WeatherForecastResponseForUI
            {
                LocationId = "1",
                DateTimeOfForecast = DateTime.Now.Date.ToShortDateString(),
            };

            _mockWeatherForecastConvertor.Convert(Arg.Any<WeatherForecastResponse>(), _options.LocationId)
                .Returns(UIWeatherForecast);

            var response = await _weatherForecastController.GetForecast(null);

            Assert.That(response, Is.TypeOf<Ok<WeatherForecastResponseForUI>>());

            var result = (Ok<WeatherForecastResponseForUI>)response;

            Assert.That(result.StatusCode, Is.EqualTo(200));
            Assert.That(result.Value, Is.EqualTo(UIWeatherForecast));
        }

        [Test]
        public async Task GetSiteList_ReturnsOk_WithSites()
        {
            var UISiteList = new SiteListResponseForUI
            {
                Sites = new List<Site>
                {
                    new Site
                    {
                        Id = 1,
                        Name = "Site One",
                    },
                    new Site
                    {
                        Id = 21,
                        Name = "Site Two",
                    },
                },
            };


            _mockSiteListConvertor.ConvertSiteList(Arg.Any<SiteListResponse>())
                .Returns(UISiteList);

            var response = await _weatherForecastController.GetSiteList("search term");

            Assert.That(response, Is.TypeOf<Ok<SiteListResponseForUI>>());

            var result = (Ok<SiteListResponseForUI>)response;

            Assert.That(result.StatusCode, Is.EqualTo(200));
            Assert.That(result.Value, Is.EqualTo(UISiteList));
        }

        [Test]
        public async Task GetSiteList_UsesSearchTerm()
        {
            var searchTerm = "search";

            _mockSiteListSearcher.SearchSiteList(Arg.Any<SiteListResponse>(), searchTerm)
                .Returns(new SiteListResponse());

            var response = await _weatherForecastController.GetSiteList(searchTerm);

            Assert.That(response, Is.TypeOf<Ok<SiteListResponseForUI>>());
            _mockSiteListSearcher.Received(1).SearchSiteList(Arg.Any<SiteListResponse>(), searchTerm);
        }

        [Test]
        public async Task GetSiteList_WithNullSearchTerm_ReturnsBadRequest()
        {
            var response = await _weatherForecastController.GetSiteList(null);

            Assert.That(response, Is.TypeOf<BadRequest<string>>());

            var result = (BadRequest<string>)response;
            Assert.That(result.StatusCode, Is.EqualTo(400));
            Assert.That(result.Value, Is.EqualTo("Search term is required."));
        }
    }
}

