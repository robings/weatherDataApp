using System;
using System.Collections.Generic;
using weatherApi.Models;
using weatherApi.Models.SiteListResponse;

namespace weatherApi.Infrastructure
{
	public class CacheStorage
	{
		private Dictionary<string, CachedWeatherForecastResponse> _cachedWeatherResponse;
		private CachedSiteListResponse _cachedSiteListResponse;

        public CacheStorage()
		{
			_cachedWeatherResponse = new Dictionary<string, CachedWeatherForecastResponse>();
			_cachedSiteListResponse = null;
		}

		public void RemoveForecast(string locationId)
		{
			_cachedWeatherResponse.Remove(locationId);
		}

		public void AddForecast(string locationId, CachedWeatherForecastResponse forecastResponse)
		{
			_cachedWeatherResponse.Add(locationId, forecastResponse);
		}

		public CachedWeatherForecastResponse GetForecast(string locationId)
		{
			var forecastAvailable = _cachedWeatherResponse.TryGetValue(locationId, out var cachedForecastResponse);

			if (forecastAvailable)
			{
				return cachedForecastResponse;
			}

			return null;
		}

		public CachedSiteListResponse GetSiteListResponse()
		{
			return _cachedSiteListResponse;
		}

		public void SetCachedSiteListResponse(CachedSiteListResponse siteListResponse)
		{
			_cachedSiteListResponse = siteListResponse;
		}
	}
}

