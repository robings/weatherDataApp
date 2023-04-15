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

namespace weatherApi.tests
{
	public class WeatherForecastProviderTest
	{
		private MockHttpMessageHandler _mockHttpMessageHandler;
		private Mock<IHttpClientFactory> _mockHttpClientFactory;
		private WeatherForecastProvider _weatherForecastProvider;
		private WeatherForecastProviderOptions _options;
		private string _sampleWeatherForecast;

		[SetUp]
		public void Setup()
		{
			var clock = new Clock(() => DateTime.Now);
			_options = new WeatherForecastProviderOptions
			{
				BaseURL = "http://baseurl/",
				Key = "TestKey",
				LocationId = "1",
				CacheRefreshInMinutes = 1,
			};

			var iOptions = Options.Create<WeatherForecastProviderOptions>(_options);

            _sampleWeatherForecast = File.ReadAllText("./sampleApiResponse.json");

            _mockHttpMessageHandler = new MockHttpMessageHandler();
            _mockHttpMessageHandler.When(HttpMethod.Get, $"{_options.BaseURL}val/wxfcs/all/json/{_options.LocationId}?res=3hourly&key={_options.Key}")
				.Respond(HttpStatusCode.OK, "application/json", _sampleWeatherForecast);

            _mockHttpClientFactory = new Mock<IHttpClientFactory>();
			_mockHttpClientFactory.Setup(x => x.CreateClient(It.IsAny<string>()))
				.Returns(new HttpClient(_mockHttpMessageHandler)
				{
					BaseAddress = new Uri(_options.BaseURL)
				});

			_weatherForecastProvider = new WeatherForecastProvider(iOptions, clock, _mockHttpClientFactory.Object.CreateClient());
		}

		[Test]
		public async Task GetForecastAsync_GivenValidRequest_ReturnsExpectedWeatherForecastResponse()
		{
			var expectedConvertedWeatherForecast = JsonSerializer.Deserialize<WeatherForecastResponse>(_sampleWeatherForecast);

			var converted = await _weatherForecastProvider.GetForecastAsync();

            var JSONexpectedForecast = JsonSerializer.Serialize(expectedConvertedWeatherForecast);
            var JSONconvertedForecast = JsonSerializer.Serialize(converted);

			Assert.That(JSONexpectedForecast, Is.EqualTo(JSONconvertedForecast));
        } 
	}
}
