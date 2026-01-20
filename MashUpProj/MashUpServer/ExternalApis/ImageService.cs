using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MashUpServer.Data;
using Newtonsoft.Json;

namespace MashUpServer.ExternalApis
{
    public class ImageService(
        MongoDbService mongo,
        HttpClient _httpClient
        )
    {

       public async Task<ImageDTO> FetchImageAsync(string query)
        {
            var url = Environment.GetEnvironmentVariable("UNSPLASH_URL");
            var endpoint = "search/photos";
            var accessKey = Environment.GetEnvironmentVariable("UNSPLASH_ACCESS_KEY");

            var lowerCaseQuery = query.ToLower();

            // Console.WriteLine($"{url}/{endpoint}?page=1&per_page=1&query={lowerCaseQuery}&client_id={accessKey}");

            HttpResponseMessage response = await _httpClient.GetAsync(
                $"{url}/{endpoint}?page=1&per_page=1&query={lowerCaseQuery}&client_id={accessKey}");
            
            string data = await response.Content.ReadAsStringAsync();
            var obj = JsonConvert.DeserializeObject<ImageDTO>(data);

            // Console.WriteLine("Data som hämtats: ", obj);

            return obj;
        }
    }   
}