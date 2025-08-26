using Microsoft.AspNetCore.Identity;
using Plastiki.Dtos.User;
using Plastiki.Interfaces;
using Plastiki.Mappers;
using Plastiki.Models;
using Plastiki.Properties.Database;

namespace Plastiki.Service;

public class UserRepository(UserManager<User> userManager, ApplicationDbContext dbContext) : IUserRepository
{
    public async Task<User> GetMeAsync(string userId)
    {
        return (await dbContext.Users.FindAsync(userId))!;
    }


    public async Task<User?> GetByIdAsync(string id)
    {
        return await dbContext.Users.FindAsync(id);
    }

    public async Task<(User, IdentityResult?)> UpdateAsync(string id, UpdateUserDto updateUserDto)
    {
        var user = (await GetByIdAsync(id))!;

        var userProperties = typeof(User).GetProperties();
        var dtoProperties = typeof(UpdateUserDto).GetProperties();

        foreach (var dtoProperty in dtoProperties)
        {
            if (dtoProperty.Name == "Password" && !string.IsNullOrEmpty(updateUserDto.Password))
            {
                user.PasswordHash = userManager.PasswordHasher.HashPassword(user, updateUserDto.Password);
                continue;
            }

            var userProperty =
                userProperties.FirstOrDefault(p => p.Name.Equals(dtoProperty.Name, StringComparison.OrdinalIgnoreCase));
            if (userProperty is null) continue;

            var value = dtoProperty.GetValue(updateUserDto);
            if (value is not null)
            {
                userProperty.SetValue(user, value);
            }
        }

        var result = await userManager.UpdateAsync(user);

        return (user, result);
    }

    public async Task DeleteAsync(string id)
    {
        var user = await GetByIdAsync(id);
        dbContext.Users.Remove(user!);
        await dbContext.SaveChangesAsync();
    }
}