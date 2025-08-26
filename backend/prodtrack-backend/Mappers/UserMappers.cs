using Microsoft.AspNetCore.Identity;
using Plastiki.Dtos.User;
using Plastiki.Models;

namespace Plastiki.Mappers;

public static class UserMappers
{
    public static UserDto ToUserDto(this User user, UserManager<User> userManager)
    {
        var roles = userManager.GetRolesAsync(user).Result;
        return new UserDto(
            user.Id,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email!,
            Username: user.UserName!,
            Role: roles.FirstOrDefault()!
        );
    }

    public static User ToUserFromCreateDto(this CreateUserDto createUserDto)
    {
        return new User
        {
            UserName = createUserDto.Username,
            FirstName = createUserDto.FirstName,
            LastName = createUserDto.LastName,
            Email = createUserDto.Email
        };
    }
}