
namespace MashUpServer.ExternalApis
{
    public class WeatherDTO
    {
        public LocationDTO Location { get; set; }
        public CurrentDTO Current { get; set; }
    
        public class LocationDTO
        {
            public string Name { get; set; }
            public string Region { get; set; }
            public string Country { get; set; }
            public float Lat { get; set; }
            public float Lon { get; set; }
        }

        public class CurrentDTO
        {
            public string Last_updated { get; set; }
            public float Temp_c { get; set; }
            public float Temp_f { get; set; }
            public int Is_day { get; set; }
            public ConditionDTO Condition { get; set; }
        }

        public class ConditionDTO
        {
            public string Text { get; set; }
            public string Icon { get; set; }
        }
    }
    

/*
    // Data utifrån WeatherAPI
    public class WeatherDTO
    {
        // location
        public string? Name { get; set; }
        public string? Region { get; set; }
        public string? Country { get; set; }
        public float? Lat { get; set; } 
        public float? Lon { get; set; } 

        // current
        public string? Last_updated { get; set; }
        public float? Temp_c { get; set; }
        public float? Temp_f { get; set; }
        public int Is_day { get; set; } // 1 = Yes 0 = No - Whether to show day condition icon or night icon

        // current / condition
        public string Text { get; set; } // ex: "Light drizzle"
        public string Icon { get; set; } // ex: "//cdn.weatherapi.com/weather/64x64/day/266.png"
    }
*/

}