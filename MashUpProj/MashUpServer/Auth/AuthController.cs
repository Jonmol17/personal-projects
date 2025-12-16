using MashUpServer.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MashUpServer.Dtos;

namespace MashUpServer.Auth
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(
        IAuthService authService,
        ILogger<AuthController> logger) : ControllerBase
    {
        public static User user = new();

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register([FromBody] UserDTO userDTO)
        {
            var user = await authService.RegisterUserAsync(userDTO);
            if (user == null)
            {
                return BadRequest("Användarnamnet är redan taget");
            }

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] UserLoginDTO userLoginDTO)
        {
            var token = await authService.LoginUserAsync(userLoginDTO);
            if (token == null)
            {
                return BadRequest("Felaktigt användarnamn eller lösenord");
            }
            return Ok(token);
        }
    }
}