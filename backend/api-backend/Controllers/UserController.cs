using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Npgsql;
using Plastiki.Dtos.User;
using Plastiki.Filters.UserFilter;
using Plastiki.Interfaces;
using Plastiki.Mappers;
using Plastiki.Models;
using Plastiki.Utils;

namespace Plastiki.Controllers;

[Authorize]
[ApiController]
[Route("api/users/[Controller]")]
public class UserController(UserManager<User> userManager, IUserRepository userRepository) : ControllerBase
{
    [Authorize(Roles = RolesUtils.Admin)]
    [HttpGet]
    public async Task<IActionResult> GetUsers([FromQuery] string role)
    {
        var users = await userManager.GetUsersInRoleAsync(role);
        return Ok(users.Select(u => u.ToUserDto(userManager)));
    }


    [HttpGet]
    [Route("{id}")]
    [ServiceFilter(typeof(UserValidateIdFilterAttribute))]
    public async Task<IActionResult> GetById([FromRoute] string id)
    {
        var user = await userRepository.GetByIdAsync(id);
        return Ok(user!.ToUserDto(userManager));
    }


    [HttpGet]
    [Route("me")]
    public async Task<IActionResult> GetMe()
    {
        var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sid);
        if (userId is null)
        {
            return NotFound(ErrorProblemDetails.NotFoundProblemDetails("Ο χρήστης δεν βρέθηκε"));
        }

        var user = await userRepository.GetMeAsync(userId!);
        return Ok(user.ToUserDto(userManager));
    }

    [Authorize(Roles = RolesUtils.Admin)]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUserDto createUserDtoDto)
    {
        try
        {
            var user = createUserDtoDto.ToUserFromCreateDto();
            var createdUser = await userManager.CreateAsync(user, createUserDtoDto.Password);
            if (!createdUser.Succeeded) return BadRequest(createdUser.Errors);


            var roleResult = await userManager.AddToRoleAsync(user, createUserDtoDto.Role.ToString());

            if (roleResult.Succeeded) return Created(user.Id, user.ToUserDto(userManager));

            return BadRequest(roleResult.Errors);
        }
        catch (Exception exception)
        {
            if (exception is DbUpdateException && exception.InnerException is PostgresException { SqlState: "23505" })
                return Conflict(new { message = "Το Email υπάρχει ήδη." });

            return StatusCode(500, exception);
        }
    }

    [HttpPatch]
    [Route("{id}")]
    [ServiceFilter(typeof(UserValidateIdFilterAttribute))]
    public async Task<IActionResult> Update([FromRoute] string id, [FromBody] UpdateUserDto updateUserDto)
    {
        var (user, result) = await userRepository.UpdateAsync(id, updateUserDto);

        if (result is not null && !result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(user.ToUserDto(userManager));
    }


    [Authorize(Roles = RolesUtils.Admin)]
    [HttpDelete]
    [Route("{id}")]
    [ServiceFilter(typeof(UserValidateIdFilterAttribute))]
    public async Task<IActionResult> Delete([FromRoute] string id)
    {
        try
        {
            await userRepository.DeleteAsync(id);
            return NoContent();
        }
        catch (Exception exception)
        {
            if (exception is DbUpdateException && exception.InnerException is PostgresException { SqlState: "23503" })
                return Conflict(new
                    { message = "Δεν είναι δυνατή η διαγραφή του χρήστη επειδή αναφέρεται από άλλες εγγραφές." });

            return StatusCode(500, exception);
        }
    }
}