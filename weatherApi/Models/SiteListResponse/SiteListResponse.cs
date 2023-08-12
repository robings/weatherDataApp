using System;
using System.Collections.Generic;

namespace weatherApi.Models.SiteListResponse
{
	public class SiteListResponse
	{
		public LocationList Locations { get; set; }
	}

	public class LocationList
	{
        public List<Location> Location { get; set; }
    }

	public class Location
	{
		public string id { get; set; }
		public string elevation { get; set; }
		public string latitude { get; set; }
		public string longitude { get; set; }
		public string name { get; set; }
		public string region { get; set; }
		public string unitaryAuthArea { get; set; }
	}
}

