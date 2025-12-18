using System.Security.Claims;
using MashUpServer.ExternalApis;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace MashUpServer.Hubs
{
    [Authorize]
    public class DataHub(
        HttpClient _httpClient,
        WeatherService weatherService
        ) : Hub
    {
        // Går med i hub utifrån klientens plats (lat, lon)
        public async Task JoinWeatherHubByCity(float lat, float lon)
        {

            if (lat == 0 || lon == 0)
            {
                // Bör returnera något meddelande?
                return;
            }

            // Behöver korta ned lat och lon för att inte skapa flera hubbar för samma "stad"
            var city = lat + "," + lon;
                
            // Går med i gruppen/Hubben utifrån lat + lon
            await Groups.AddToGroupAsync(Context.ConnectionId, city.ToString());

            // Noterar att anv gått med i grupp/Hubben
            await Clients.Caller.SendAsync("Joined", Context.ConnectionId);      
        }

        // Hämtar väderdata utifrån lat och lon och skickar till klienten
        public async Task WeatherfetchRealtime(float lat, float lon)
        {   
            while (true)
            {
                // Anropar WeatherService (FetchRealtimeAsync) för att hämta data
                var data = await weatherService.FetchRealtimeAsync(lat, lon);
                var city = lat + "," + lon;

                await Clients.Group(city.ToString())
                    .SendAsync("WeatherData", data);

                // Delay på 1 minut innan loopen körs igen (polling)
                await Task.Delay(TimeSpan.FromMinutes(1));
            }
        }
    }
}