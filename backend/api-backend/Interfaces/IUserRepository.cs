using Microsoft.AspNetCore.Identity;
using Plastiki.Dtos.User;
using Plastiki.Models;

namespace Plastiki.Interfaces;

public interface IUserRepository
{
    Task<User> GetMeAsync(string userId);
    Task<User?> GetByIdAsync(string id);
    Task<(User, IdentityResult?)> UpdateAsync(string id, UpdateUserDto updateUserDto);
    Task DeleteAsync(string id);
}