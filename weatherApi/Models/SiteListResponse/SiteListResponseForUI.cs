using System;
using System.Collections.Generic;

namespace weatherApi.Models.SiteListResponse
{
	public class SiteListResponseForUI
	{
		public List<Site> Sites { get; set; }
	}

	public class Site
	{
		public int Id { get; set; }
		public string Name { get; set; }
	}
}

