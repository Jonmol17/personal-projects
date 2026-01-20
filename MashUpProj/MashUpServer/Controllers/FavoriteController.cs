using MashUpServer.Dtos;
using MashUpServer.ExternalApis;
using MashUpServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MashUpServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoriteController(
        ILogger<FavoriteController> logger,
        FavoriteService favoriteService
    ) : ControllerBase
    {
        private readonly ILogger<FavoriteController> _logger = logger;
        private readonly FavoriteService _favoriteService = favoriteService;

        [Authorize]
        [HttpPost("addFavorite")]
        public async Task<ActionResult<object>?> AddFavorite([FromBody] AddFavoriteDTO addFavoriteDTO)
        {

            if (addFavoriteDTO.City == null || addFavoriteDTO.Country == null)
            {
                return BadRequest("Något gick fel!");
            }

            var result = await _favoriteService.AddFavoriteAsync(addFavoriteDTO);

            if (result == null)
            {
                return BadRequest("Denna stad är redan tillagd som favorit!");
            }

            return Ok(result);
        }
        
        [Authorize]
        [HttpGet("favoriteWeather")]
        public async Task<ActionResult<List<WeatherDTO>>> GetFavoriteWeatherByUserId()
        {
            var result = await _favoriteService.getFavoriteWeatherByUserIdAsync();
            return Ok(result);
        }
    }
}