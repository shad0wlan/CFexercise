using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Plastiki.Interfaces;
using Plastiki.Models;

namespace Plastiki.Service;

public class TokenService(IConfiguration configuration, UserManager<User> userManager) : ITokenService
{
    private readonly SymmetricSecurityKey _symmetricSecurity =
        new(Encoding.UTF8.GetBytes(configuration["JWT:SigningKey"]!));

    public async Task<string> CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sid, user.Id),
            new(JwtRegisteredClaimNames.GivenName, user.UserName!)
        };
        
        // Add user's roles as claims
        var userRoles = await userManager.GetRolesAsync(user);
        claims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));
        
        var credentials = new SigningCredentials(_symmetricSecurity, SecurityAlgorithms.HmacSha512Signature);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(30),
            SigningCredentials = credentials,
            Issuer = configuration["JWT:Issuer"],
            Audience = configuration["JWT:Audience"]
        };
        var tokenHandler = new JwtSecurityTokenHandler();

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}