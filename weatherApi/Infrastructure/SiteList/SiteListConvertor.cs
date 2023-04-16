using System;
using System.Linq;
using weatherApi.Models.SiteListResponse;

namespace weatherApi.Infrastructure
{
	public class SiteListConvertor : ISiteListConvertor
	{
        public SiteListResponseForUI ConvertSiteList(SiteListResponse siteList)
        {
            var convertedSiteList = siteList.Locations.Location.Select(location =>
            {
                return new Site
                {
                    Id = int.Parse(location.id),
                    Name = location.name,
                };
            }).ToList();

            return new SiteListResponseForUI
            {
                Sites = convertedSiteList,
            };
        }
    }
}

