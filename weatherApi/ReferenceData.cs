﻿using System;
using System.Collections.Generic;

namespace weatherApi
{
    public class ReferenceData
    {
        public readonly Dictionary<string, string> WeatherType;
        public readonly Dictionary<string, string> Visability;

        public ReferenceData()
        {
            WeatherType = new Dictionary<string, string>
            {
                { "NA", "Not available" },
                { "0", "Clear night" },
                { "1", "Sunny day" },
                { "2", "Partly cloudy (night)" },
                { "3", "Partly cloudy (day)" },
                { "4", "Not used" },
                { "5", "Mist" },
                { "6", "Fog" },
                { "7", "Cloudy" },
                { "8", "Overcast" },
                { "9", "Light rain shower (night)" },
                { "10", "Light rain shower (day)" },
                { "11", "Drizzle" },
                { "12", "Light rain" },
                { "13", "Heavy rain shower (night)" },
                { "14", "Heavy rain shower (day)" },
                { "15", "Heavy rain" },
                { "16", "Sleet shower (night)" },
                { "17", "Sleet shower (day)" },
                { "18", "Sleet" },
                { "19", "Hail shower (night)" },
                { "20", "Hail shower (day)" },
                { "21", "Hail" },
                { "22", "Light snow shower (night)" },
                { "23", "Light snow shower (day)" },
                { "24", "Light snow" },
                { "25", "Heavy snow shower (night)" },
                { "26", "Heavy snow shower (day)" },
                { "27", "Heavy snow" },
                { "28", "Thunder shower (night)" },
                { "29", "Thunder shower (day)" },
                { "30", "Thunder" },
            };

            Visability = new Dictionary<string, string>
            {
                { "UN", "Unknown" },
                { "VP", "Very poor < 1 km" },
                { "PO", "Poor 1-4 km" },
                { "MO", "Moderate 4-10 km" },
                { "GO", "Good 10-20 km" },
                { "VG", "Very good 20-40 km" },
                { "EX", "Excellent < 40 km" },
            };
        }
    }
}
