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

    public static async Task SeedDefaultUsersAsync(IServiceProvider services) {
        var userManager = services.GetRequiredService<UserManager<User>>();
        
        var operatorUser = await userManager.FindByNameAsync("operator");
        if (operatorUser == null)
        {
            operatorUser = new User
            {
                UserName = "operator",
                Email = "operator@prodtrack.com",
                FirstName = "ProdTrack",
                LastName = "Operator",
            };

            var result = await userManager.CreateAsync(operatorUser, "Operator2025");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(operatorUser, "Operator");
            }
        }

        var workerUser = await userManager.FindByNameAsync("worker");
        if (workerUser == null)
        {
            workerUser = new User
            {
                UserName = "worker",
                Email = "worker@prodtrack.com",
                FirstName = "ProdTrack",
                LastName = "Worker",
            };

            var result = await userManager.CreateAsync(workerUser, "Worker2025");
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(workerUser, "Worker");
            }
        }
    }
}