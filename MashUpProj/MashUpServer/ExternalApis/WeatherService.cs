using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MashUpServer.Data;
using Newtonsoft.Json;

namespace MashUpServer.ExternalApis
{
    public class WeatherService(
        MongoDbService mongo,
        HttpClient _httpClient
        )
    {

        // REST Väder utifrån stad
        public async Task<WeatherDTO> FetchCurrentAsync(string input)
        {
            var baseUrl = Environment.GetEnvironmentVariable("WEATHER_BASE_URL");
            var endpoint = "current.json";
            var apiKey = Environment.GetEnvironmentVariable("WEATHER_API_KEY");
            var lang = "sv";

            var lowerCaseInput = input.ToLower();

            Console.WriteLine($"{baseUrl}/{endpoint}?q={lowerCaseInput}&lang={lang}&key={apiKey}");

            HttpResponseMessage response = await _httpClient.GetAsync(
                $"{baseUrl}/{endpoint}?q={lowerCaseInput}&lang={lang}&key={apiKey}");

            Console.WriteLine(response.StatusCode);
            Console.WriteLine(response.RequestMessage);
            
            string data = await response.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<WeatherDTO>(data);

            return obj;
        }

        // Används i SignalR hubben (WeatherfetchRealtime) 
        public async Task<List<WeatherDTO>> FetchRealtimeAsync(float lat, float lon)
        {
            var baseUrl = Environment.GetEnvironmentVariable("WEATHER_BASE_URL");
            var endpoint = "current.json";
            var apiKey = Environment.GetEnvironmentVariable("WEATHER_API_KEY");
            var lang = "sv";

            var input = $"{lat},{lon}";

            HttpResponseMessage response = await _httpClient.GetAsync(
                $"{baseUrl}/{endpoint}?q={input}&lang={lang}&key={apiKey}");
            
            string data = await response.Content.ReadAsStringAsync();
            var list = JsonConvert.DeserializeObject<WeatherDTO>(data);

            return new List<WeatherDTO> { list };
        }
    }
}