using MashUpServer.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MashUpServer.Dtos;

namespace MashUpServer.Auth
{
    public interface IAuthService
    {
        Task<User?> RegisterUserAsync(UserDTO userDTO);
        Task<string?> LoginUserAsync(UserLoginDTO userLoginDTO);
    }
}