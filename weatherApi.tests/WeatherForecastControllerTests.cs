﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Options;
using Moq;
using NUnit.Framework;
using weatherApi.Controllers;
using weatherApi.Infrastructure;
using weatherApi.Models;
using weatherApi.Models.SiteListResponse;

namespace weatherApi.tests
{
	public class WeatherForecastControllerTests
	{
        private WeatherForecastOptions _options;
		private Mock<IWeatherForecastConvertor> _mockWeatherForecastConvertor;
        private Mock<ISiteListConvertor> _mockSiteListConvertor;
		private Mock<IWeatherForecastProvider> _mockWeatherForecastProvider;
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

            _mockWeatherForecastConvertor = new Mock<IWeatherForecastConvertor>();
			_mockWeatherForecastProvider = new Mock<IWeatherForecastProvider>();

            _mockSiteListConvertor = new Mock<ISiteListConvertor>();

			_weatherForecastController = new WeatherForecastController(
				iOptions,
				_mockWeatherForecastProvider.Object,
				_mockWeatherForecastConvertor.Object,
                _mockSiteListConvertor.Object);
        }

		[Test]
		public async Task GetForecast_ReturnsOk_WithForecast()
		{
			var UIWeatherForecast = new WeatherForecastResponseForUI
			{
				LocationId = "1",
				DateTimeOfForecast = DateTime.Now.Date.ToShortDateString(),
			};


            _mockWeatherForecastConvertor.Setup(m => m.Convert(It.IsAny<WeatherForecastResponse>(), It.IsAny<string>()))
				.Returns(UIWeatherForecast);

			var response = await _weatherForecastController.GetForecast();

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


            _mockSiteListConvertor.Setup(m => m.ConvertSiteList(It.IsAny<SiteListResponse>()))
                .Returns(UISiteList);

            var response = await _weatherForecastController.GetSiteList();

            Assert.That(response, Is.TypeOf<Ok<SiteListResponseForUI>>());

            var result = (Ok<SiteListResponseForUI>)response;

            Assert.That(result.StatusCode, Is.EqualTo(200));
            Assert.That(result.Value, Is.EqualTo(UISiteList));
        }
    }
}

