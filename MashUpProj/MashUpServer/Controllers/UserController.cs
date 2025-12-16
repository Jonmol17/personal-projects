using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MashUpServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController(ILogger<UserController> logger) : ControllerBase
    {
        private readonly ILogger<UserController> _logger = logger;

        
    }
}