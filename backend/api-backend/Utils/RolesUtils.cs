using Microsoft.AspNetCore.Identity;
using Plastiki.Models;

namespace Plastiki.Utils;

public static class RolesUtils
{
    public const string Admin = "Admin";
    public const string Operator = "Operator";
    public const string Worker = "Worker";


    public static async Task SeedRolesAsync(IServiceProvider services)
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var roles = new[] { Admin, Operator, Worker };
        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }
    }
    
    public static async Task SeedDefaultAdminAsync(IServiceProvider services) {
        var userManager = services.GetRequiredService<UserManager<User>>();
        var adminUser = await userManager.FindByNameAsync("admin");

        if (adminUser == null)
        {
            adminUser = new User
            {
                UserName = "admin",
                Email = "admin@prodtrack.com",
                FirstName = "ProdTrack",
                LastName = "Admin",
            };

            var result = await userManager.CreateAsync(adminUser, "ProdTrack2025");

            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(adminUser, "Admin");
            }
        }
    }
}