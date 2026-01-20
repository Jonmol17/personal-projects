using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MashUpServer.ExternalApis
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImageController : ControllerBase
    {
        private readonly ILogger<ImageController> _logger;
        private readonly ImageService _imageService;

        public ImageController(
            ILogger<ImageController> logger,
            ImageService imageService)
        {
            _logger = logger;
            _imageService = imageService;
        }

        [HttpGet("fetchImage/{query}")]
        public async Task<ActionResult<ImageDTO>?> FetchImage([FromRoute] string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                return BadRequest("Behöver ange ett sökord");
            }

            var image = await _imageService.FetchImageAsync(query);

            if (image == null)
            {
                return NotFound("Hittade ingen bild för " + query);
            }

            return Ok(image);
        }
    }

}