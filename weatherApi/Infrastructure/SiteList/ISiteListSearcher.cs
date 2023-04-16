using System;
using weatherApi.Models.SiteListResponse;

namespace weatherApi.Infrastructure.SiteList
{
	public interface ISiteListSearcher
	{
        public SiteListResponse SearchSiteList(
            SiteListResponse siteListResponse,
            string searchTerm);
    }
}
