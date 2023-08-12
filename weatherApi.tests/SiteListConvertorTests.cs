using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using NUnit.Framework;
using weatherApi.Infrastructure;
using weatherApi.Models;
using weatherApi.Models.SiteListResponse;

namespace weatherApi.tests
{
	public class SiteListConvertorTests
	{
		[Test]
		public void ConvertSiteList_ConvertsSiteListAsExpected()
		{
            var sampleSiteListResponse = JsonSerializer.Deserialize<SiteListResponse>(File.ReadAllText("./sampleSitesApiResponse.json"));
			var expectedSiteList = new SiteListResponseForUI
			{
				Sites = new List<Site>
				{
					new Site
					{
						Id = 14,
						Name = "Carlisle Airport",
					},
                    new Site
                    {
                        Id = 26,
                        Name = "Liverpool John Lennon Airport",
                    },
                    new Site
                    {
                        Id = 33,
                        Name = "Scatsta",
                    },
                    new Site
                    {
                        Id = 3081,
                        Name = "Braemar",
                    },
                },
			};

            var siteListConvertor = new SiteListConvertor();

            var convertedSiteList = siteListConvertor.ConvertSiteList(sampleSiteListResponse);

            var JSONexpectedSiteList = JsonSerializer.Serialize(expectedSiteList);
            var JSONconvertedSiteList = JsonSerializer.Serialize(convertedSiteList);

            Assert.That(JSONconvertedSiteList, Is.EqualTo(JSONexpectedSiteList));
        }
	}
}

