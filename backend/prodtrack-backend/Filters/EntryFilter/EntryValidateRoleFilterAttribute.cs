using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;
using Plastiki.Enums;
using Plastiki.Interfaces;
using Plastiki.Utils;

namespace Plastiki.Filters.EntryFilter;

public class EntryValidateRoleFilterAttribute(IEntryRepository entryRepository) : ActionFilterAttribute
{
    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (context.ActionArguments.TryGetValue("id", out var id) && id is int entryId)
        {
            var userId = context.HttpContext.User.FindFirstValue(JwtRegisteredClaimNames.Sid);
            var userRole = context.HttpContext.User.FindFirstValue(ClaimTypes.Role);

            if (userId is null || userRole is null)
            {
                ActionFilterResultUtils.SetNotFoundResult(context, "User", "Ο χρήστης δεν βρέθηκε");
                return;
            }

            var entry = await entryRepository.GetByIdAsync(entryId);

            if (!userRole.Equals(Roles.Worker.ToString(), StringComparison.OrdinalIgnoreCase) ||
                entry?.UserId == userId) await next();

            ActionFilterResultUtils.SetForbiddenResult(context, "User", "Δεν έχετε τα απαραίτητα δικαιώματα");
            return;
        }

        await next();
    }
}