using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Moq;
using NUnit.Framework;
using RichardSzalay.MockHttp;
using weatherApi.Infrastructure;
using weatherApi.Models;
using weatherApi.Models.SiteListResponse;

namespace weatherApi.tests
{
	public class WeatherForecastProviderTest
	{
		private MockHttpMessageHandler _mockHttpMessageHandler;
		private Mock<IHttpClientFactory> _mockHttpClientFactory;
		private WeatherForecastProvider _weatherForecastProvider;
		private WeatherForecastOptions _options;
		private string _sampleWeatherForecast;
		private string _sampleSiteList;
		private MockedRequest _mockWeatherForecastRequest;
		private MockedRequest _mockSiteListRequest;
		private Clock _clock;

		[SetUp]
		public void Setup()
		{
			_clock = new Clock(() => DateTime.Now);
			_options = new WeatherForecastOptions
			{
				BaseURL = "http://baseurl/",
				Key = "TestKey",
				LocationId = "1",
				CacheRefreshInMinutes = 1,
			};

			var iOptions = Options.Create<WeatherForecastOptions>(_options);

            _sampleWeatherForecast = File.ReadAllText("./sampleApiResponse.json");
			_sampleSiteList = File.ReadAllText("./sampleSitesApiResponse.json");

            _mockHttpMessageHandler = new MockHttpMessageHandler();
            _mockWeatherForecastRequest = _mockHttpMessageHandler.When(HttpMethod.Get, $"{_options.BaseURL}val/wxfcs/all/json/{_options.LocationId}?res=3hourly&key={_options.Key}")
				.Respond(HttpStatusCode.OK, "application/json", _sampleWeatherForecast);

            _mockSiteListRequest = _mockHttpMessageHandler.When(HttpMethod.Get, $"{_options.BaseURL}val/wxfcs/all/json/sitelist?key={_options.Key}")
                .Respond(HttpStatusCode.OK, "application/json", _sampleSiteList);

            _mockHttpClientFactory = new Mock<IHttpClientFactory>();
			_mockHttpClientFactory.Setup(x => x.CreateClient(It.IsAny<string>()))
				.Returns(new HttpClient(_mockHttpMessageHandler)
				{
					BaseAddress = new Uri(_options.BaseURL)
				});

			_weatherForecastProvider = new WeatherForecastProvider(iOptions, _clock, _mockHttpClientFactory.Object.CreateClient());
		}

		[Test]
		public async Task GetForecastAsync_GivenValidRequest_ReturnsExpectedWeatherForecastResponse()
		{
			var expectedConvertedWeatherForecast = JsonSerializer.Deserialize<WeatherForecastResponse>(_sampleWeatherForecast);

			var receivedWeatherForecast = await _weatherForecastProvider.GetForecastAsync(_options.LocationId);

            var JSONexpectedForecast = JsonSerializer.Serialize(expectedConvertedWeatherForecast);
            var JSONconvertedForecast = JsonSerializer.Serialize(receivedWeatherForecast);

			Assert.That(JSONexpectedForecast, Is.EqualTo(JSONconvertedForecast));
			Assert.That(_mockHttpMessageHandler.GetMatchCount(_mockWeatherForecastRequest), Is.EqualTo(1));
        }

        [Test]
        public async Task GetForecastAsync_GivenValidRequest_ThenSameRequestWithinCachingTime_OnlyMakesHttpRequestOnce()
        {
            await _weatherForecastProvider.GetForecastAsync(_options.LocationId);

            // call it twice more
            await _weatherForecastProvider.GetForecastAsync(_options.LocationId);
            await _weatherForecastProvider.GetForecastAsync(_options.LocationId);

            Assert.That(_mockHttpMessageHandler.GetMatchCount(_mockWeatherForecastRequest), Is.EqualTo(1));
        }

		[Test]
		public async Task GetForecastAsync_GivenValidRequest_ThenSameRequest_AfterCachingExpired_MakesHttpRequestTwice()
		{
            await _weatherForecastProvider.GetForecastAsync(_options.LocationId);

			// change the clock
			_clock.UpdateClock(() => DateTime.Now.AddMinutes(_options.CacheRefreshInMinutes));
            await _weatherForecastProvider.GetForecastAsync(_options.LocationId);

            Assert.That(_mockHttpMessageHandler.GetMatchCount(_mockWeatherForecastRequest), Is.EqualTo(2));
        }

        [Test]
        public async Task GetSiteListAsync_GivenValidRequest_ReturnsExpectedWeatherForecastResponse()
        {
            var expectedConvertedSiteList = JsonSerializer.Deserialize<SiteListResponse>(_sampleSiteList);

            var receivedSiteList = await _weatherForecastProvider.GetSiteListAsync();

            var JSONexpectedSiteList = JsonSerializer.Serialize(expectedConvertedSiteList);
            var JSONconvertedSiteList = JsonSerializer.Serialize(receivedSiteList);

            Assert.That(JSONexpectedSiteList, Is.EqualTo(JSONconvertedSiteList));
            Assert.That(_mockHttpMessageHandler.GetMatchCount(_mockSiteListRequest), Is.EqualTo(1));
        }

        [Test]
        public async Task GetSiteListAsync_GivenValidRequest_ThenSameRequestWithinCachingTime_OnlyMakesHttpRequestOnce()
        {
            await _weatherForecastProvider.GetSiteListAsync();

            // call it twice more
            await _weatherForecastProvider.GetSiteListAsync();
            await _weatherForecastProvider.GetSiteListAsync();

            Assert.That(_mockHttpMessageHandler.GetMatchCount(_mockSiteListRequest), Is.EqualTo(1));
        }

        [Test]
        public async Task GetSiteListAsync_GivenValidRequest_ThenSameRequest_AfterCachingExpired_MakesHttpRequestTwice()
        {
            await _weatherForecastProvider.GetSiteListAsync();

            // change the clock
            _clock.UpdateClock(() => DateTime.Now.AddDays(1));
            await _weatherForecastProvider.GetSiteListAsync();

            Assert.That(_mockHttpMessageHandler.GetMatchCount(_mockSiteListRequest), Is.EqualTo(2));
        }
    }
}
