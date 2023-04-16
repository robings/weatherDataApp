using System;
using System.Collections.Generic;
using System.Text.Json;
using NUnit.Framework;
using weatherApi.Infrastructure.SiteList;
using weatherApi.Models.SiteListResponse;

namespace weatherApi.tests
{
	public class SiteListSearcherTests
	{
		private SiteListSearcher _siteListSearcher;
		private readonly SiteListResponse SiteListResponse = new SiteListResponse
        {
            Locations = new LocationList
            {
                Location = new List<Location>
                    {
                        new Location
                        {
                            id = "1",
                            name = "Site Number One",
                        },
                        new Location
                        {
                            id = "2",
                            name = "Site Two",
                        },
                        new Location
                        {
                            id = "3",
                            name = "Site number Three",
                        },
                        new Location
                        {
                            id = "40",
                            name = "Another name entirely",
                        },
                    },
            },
        };

        [SetUp]
		public void Setup()
		{
			_siteListSearcher = new SiteListSearcher();
		}

		[Test]
		public void SearchSiteList_ReturnsSitesWithGivenSearchTerm_NoSpace()
		{
            var filterResponse = _siteListSearcher.SearchSiteList(SiteListResponse, "sit");

            var expectedFilteredList = new List<Location>
            {
                SiteListResponse.Locations.Location[0],
                SiteListResponse.Locations.Location[1],
                SiteListResponse.Locations.Location[2],
            };

            var expectedFilteredResponse = new SiteListResponse
            {
                Locations = new LocationList
                {
                    Location = expectedFilteredList,
                },
            };

            var JSONexpectedFilteredResponse = JsonSerializer.Serialize(expectedFilteredResponse);
            var JSONfilteredResponse = JsonSerializer.Serialize(filterResponse);

            Assert.That(JSONfilteredResponse, Is.EqualTo(JSONexpectedFilteredResponse));
		}

        [Test]
        public void SearchSiteList_ReturnsSitesWithGivenSearchTerm_WithSpace()
        {
            var filterResponse = _siteListSearcher.SearchSiteList(SiteListResponse, "site num");

            var expectedFilteredList = new List<Location>
            {
                SiteListResponse.Locations.Location[0],
                SiteListResponse.Locations.Location[2],
            };

            var expectedFilteredResponse = new SiteListResponse
            {
                Locations = new LocationList
                {
                    Location = expectedFilteredList,
                },
            };

            var JSONexpectedFilteredResponse = JsonSerializer.Serialize(expectedFilteredResponse);
            var JSONfilteredResponse = JsonSerializer.Serialize(filterResponse);

            Assert.That(JSONfilteredResponse, Is.EqualTo(JSONexpectedFilteredResponse));
        }

        [Test]
        public void SearchSiteList_ReturnsSitesWithGivenSearchTerm_NotAtBeginningOfSiteName()
        {
            var filterResponse = _siteListSearcher.SearchSiteList(SiteListResponse, "name");

            var expectedFilteredList = new List<Location>
            {
                SiteListResponse.Locations.Location[3],
            };

            var expectedFilteredResponse = new SiteListResponse
            {
                Locations = new LocationList
                {
                    Location = expectedFilteredList,
                },
            };

            var JSONexpectedFilteredResponse = JsonSerializer.Serialize(expectedFilteredResponse);
            var JSONfilteredResponse = JsonSerializer.Serialize(filterResponse);

            Assert.That(JSONfilteredResponse, Is.EqualTo(JSONexpectedFilteredResponse));
        }

        [Test]
        public void SearchSiteList_ReturnsSitesWithGivenSearchTerm_AtEndOfSiteName()
        {
            var filterResponse = _siteListSearcher.SearchSiteList(SiteListResponse, "Three");

            var expectedFilteredList = new List<Location>
            {
                SiteListResponse.Locations.Location[2],
            };

            var expectedFilteredResponse = new SiteListResponse
            {
                Locations = new LocationList
                {
                    Location = expectedFilteredList,
                },
            };

            var JSONexpectedFilteredResponse = JsonSerializer.Serialize(expectedFilteredResponse);
            var JSONfilteredResponse = JsonSerializer.Serialize(filterResponse);

            Assert.That(JSONfilteredResponse, Is.EqualTo(JSONexpectedFilteredResponse));
        }
    }
}
