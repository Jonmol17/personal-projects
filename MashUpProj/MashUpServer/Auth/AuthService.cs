using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MashUpServer.Entities;
using MashUpServer.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using MashUpServer.Data;

namespace MashUpServer.Auth
{
    public class AuthService(MongoDbService mongo, IConfiguration configuration) : IAuthService
    {
        private readonly IMongoCollection<User> _users = mongo.Database.GetCollection<User>("users");
        private readonly IConfiguration _configuration = configuration;

        public async Task<string?> LoginUserAsync(UserLoginDTO userLoginDTO)
        {
            var user = await _users
                .Find(u => u.Username == userLoginDTO.Username)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return null;
            }

            if (new PasswordHasher<User>()
                    .VerifyHashedPassword(user, user.Password_Hashed, userLoginDTO.Password) == PasswordVerificationResult.Failed)
            {
                return null;
            }
                
            return CreateToken(user);
        }

        public async Task<User?> RegisterUserAsync(UserDTO userDTO)
        {

            var exists = await _users
                .Find(u => u.Username.ToLower() == userDTO.Username.ToLower())
                .AnyAsync();
            
            // Om användaren finns, return
            if (exists)
            {
                return null;
            }
                
            var user = new User();

            var hashedPassword = new PasswordHasher<User>()
                .HashPassword(user, userDTO.Password_Hashed);

            user.Username = userDTO.Username;
            user.Password_Hashed = hashedPassword;
            user.Created_At = DateTime.UtcNow;

            await _users.InsertOneAsync(user);

            return user;
        }

        private string CreateToken(User user)
        {

            var SecretKey = _configuration["JWT_SECRET"];
            var Issuer = _configuration["JWT_ISSUER"];
            var Audience = _configuration["JWT_AUDIENCE"];

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.User_Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(SecretKey));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: Issuer,
                audience: Audience,
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}
