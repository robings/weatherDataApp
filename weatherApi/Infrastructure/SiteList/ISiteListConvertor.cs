using System;
using weatherApi.Models.SiteListResponse;

namespace weatherApi.Infrastructure
{
	public interface ISiteListConvertor
	{
		public SiteListResponseForUI ConvertSiteList(SiteListResponse siteList);
	}
}

