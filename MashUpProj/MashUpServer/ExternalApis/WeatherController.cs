using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MashUpServer.ExternalApis
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherController : ControllerBase
    {
        private readonly ILogger<WeatherController> _logger;
        private readonly WeatherService _weatherService;

        public WeatherController(
            ILogger<WeatherController> logger,
            WeatherService weatherService)
        {
            _logger = logger;
            _weatherService = weatherService;
        }

        [HttpGet("current/{input}")]
        public async Task<ActionResult<WeatherDTO>?> FetchCurrent([FromRoute] string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return null;
            }

            var weather = await _weatherService.FetchCurrentAsync(input);

            if (weather == null)
            {
                return NotFound("Hittade ingen väderdata för " + input);
            }

            return Ok(weather);
        }
    }
}