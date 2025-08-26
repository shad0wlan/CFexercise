using Microsoft.AspNetCore.Mvc.Filters;
using Plastiki.Interfaces;
using Plastiki.Utils;

namespace Plastiki.Filters.UserFilter;

public class UserValidateIdFilterAttribute(IUserRepository userRepository) : ActionFilterAttribute
{
    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (!context.ActionArguments.TryGetValue("id", out var id))
        {
            ActionFilterResultUtils.SetBadRequestResult(context, "Id", "Απαιτείται αναγνωριστικό");
            return;
        }

        if (id is string userId)
        {
            var user = await userRepository.GetByIdAsync(userId);

            if (user is null)
            {
                ActionFilterResultUtils.SetNotFoundResult(context, "Id",
                    "Ο χρήστης με το συγκεκριμένο αναγνωριστικό δεν υπάρχει");
                return;
            }
        }

        await next();
    }
}