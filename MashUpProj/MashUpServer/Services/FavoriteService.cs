using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MashUpServer.Data;
using MashUpServer.Entities;
using MongoDB.Driver;
using MashUpServer.Dtos;
using System;
using System.Security.Claims;
using MashUpServer.ExternalApis;
using ZstdSharp.Unsafe;

namespace MashUpServer.Services
{
    public class FavoriteService(
        MongoDbService mongo, 
        IHttpContextAccessor httpContextAccessor,
        WeatherService _weatherService
        
        )
    {
        private readonly IMongoCollection<Favorite> _favorites = mongo.Database.GetCollection<Favorite>("favorites");
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;


        public async Task<AddFavoriteDTO?> AddFavoriteAsync(AddFavoriteDTO addFavoriteDTO)
        {
            if (addFavoriteDTO == null)
            {
                throw new ArgumentNullException("Fälten måste vara ifyllda!");
            }

            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

            if (userId == null)
            {
                throw new UnauthorizedAccessException("User not authenticated");
            }

            var existingFavorites = await _favorites.Find(f => f.User_Id == userId && f.City == addFavoriteDTO.City).FirstOrDefaultAsync();

            if (existingFavorites != null)
            {
                return null;
            }

            var favorite = new Favorite {
                User_Id = userId, 
                City = addFavoriteDTO.City, 
                Country = addFavoriteDTO.Country
            };

            await _favorites.InsertOneAsync(favorite);

            return addFavoriteDTO;
        }

        public async Task<List<WeatherDTO>> getFavoriteWeatherByUserIdAsync()
        {
            // Hämtar userId från Claims
            var userId = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

            if (userId == null)
            {
                return null;
            }

            // Hämtar favoriterna utifrån anv id
            var favorite = await _favorites.Find(f => f.User_Id == userId).ToListAsync();

            var weatherList = new List<WeatherDTO>();
            
            // Anropar FetchCurrentAsync för varje city 
            foreach (var i in favorite)
            {
                var weather = await _weatherService.FetchCurrentAsync(i.City); 
                weatherList.Add(weather);
            }
           
            return weatherList;
        }
    }
}