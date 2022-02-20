using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace weatherApi.Models
{
    public class WeatherForecastResponse
    {
        public SiteRep SiteRep { get; set; }
    }

    public class SiteRep
    {
        public Wx Wx { get; set; }

        public DV DV { get; set; }
    }

    public class Wx
    {
        public List<Param> Param { get; set; }
    }

    public class Param
    {
        public string name { get; set; }
        public string units { get; set; }
        [JsonPropertyName("$")]
        public string ReadableName { get; set; }
    }

    public class DV
    {
        public string dataDate { get; set; }
        public string type { get; set; }
        public Location Location { get; set; }
    }

    public class Location
    {
        public string i { get; set; }
        public string lat { get; set; }
        public string lon { get; set; }
        public string name { get; set; }
        public string country { get; set; }
        public string continent { get; set; }
        public string elevation { get; set; }
        public List<Period> Period { get; set; }
    }

    public class Period
    {
        public string type { get; set; }
        public string value { get; set; }
        public List<Rep> Rep { get; set; }
    }

    public class Rep
    {
        public string D { get; set; }
        public string F { get; set; }
        public string G { get; set; }
        public string H { get; set; }
        public string Pp { get; set; }
        public string S { get; set; }
        public string T { get; set; }
        public string V { get; set; }
        public string W { get; set; }
        public string U { get; set; }
        [JsonPropertyName("$")]
        public string Name { get; set; }
    }
}
