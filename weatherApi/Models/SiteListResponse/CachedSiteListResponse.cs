using System;
namespace weatherApi.Models.SiteListResponse
{
	public class CachedSiteListResponse
	{
        public DateTime LastReceived { get; set; }

        public SiteListResponse SiteListResponse { get; set; }
    }
}
