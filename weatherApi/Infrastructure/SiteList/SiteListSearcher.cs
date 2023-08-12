using System;
using weatherApi.Models.SiteListResponse;

namespace weatherApi.Infrastructure.SiteList
{
	public class SiteListSearcher : ISiteListSearcher
	{
        public SiteListResponse SearchSiteList(
            SiteListResponse siteListResponse,
            string searchTerm)
        {
            var filteredList = siteListResponse.Locations.Location.FindAll(
                x => x.name.ToLowerInvariant().Contains(searchTerm.ToLowerInvariant()));

            var filteredResponse = new SiteListResponse
            {
                Locations = new LocationList
                {
                    Location = filteredList,
                },
            };

            return filteredResponse;
        }
    }
}

