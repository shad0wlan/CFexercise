using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Plastiki.Dtos;
using Plastiki.Interfaces;
using Plastiki.Models;
using Plastiki.Utils;

namespace Plastiki.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(
    UserManager<User> userManager,
    ITokenService tokenService,
    SignInManager<User> signInManager) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        var user = await userManager.Users.FirstOrDefaultAsync(u => EF.Functions.ILike(u.UserName!, loginDto.Username));

        var unauthorizedProblemDetails =
            ErrorProblemDetails.UnauthorizedProblemDetails("Λανθασμένο όνομα χρήστη ή κωδικός πρόσβασης");

        if (user is null) return Unauthorized(unauthorizedProblemDetails);

        var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded)
            return Unauthorized(unauthorizedProblemDetails);
        return Ok(new TokenDto
        {
            AccessToken = await tokenService.CreateToken(user)
        });
    }
}