using MashUpServer.Data;
using MashUpServer.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using MashUpServer.Hubs;
using MashUpServer.ExternalApis;

var builder = WebApplication.CreateBuilder(args);

// Env variabler från Docker miljön
string SecretKey = Environment.GetEnvironmentVariable("JWT_SECRET");
string Issuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
string Audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = Issuer,
            ValidateAudience = true,
            ValidAudience = Audience,
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(SecretKey)),
            ValidateIssuerSigningKey = true,
        };

        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
          {
              var accessToken = context.Request.Query["access_token"];

              var path = context.HttpContext.Request.Path;
              if (!string.IsNullOrEmpty(accessToken) &&
                  (path.StartsWithSegments("/DataHubV1")))
              {
                  context.Token = accessToken;
              }
              return Task.CompletedTask;
          }
        };
    });

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

builder.Services.AddScoped<DataHub>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<WeatherService>();

builder.Services.AddSingleton<MongoDbService>();

builder.Services.AddScoped<HttpClient>();

builder.Services.AddSignalR();

builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.MapOpenApi();
app.UseSwagger(); 
app.UseSwaggerUI();

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapHub<DataHub>("/DataHubV1");

app.MapControllers();

app.Run();
