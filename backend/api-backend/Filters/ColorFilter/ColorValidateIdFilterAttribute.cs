using Microsoft.AspNetCore.Mvc.Filters;
using Plastiki.Interfaces;
using Plastiki.Models;
using Plastiki.Utils;

namespace Plastiki.Filters.ColorFilter;

public class ColorValidateIdFilterAttribute(IBasicInfoRepository<Color> colorRepository) : ActionFilterAttribute
{
    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (!context.ActionArguments.TryGetValue("id", out var id))
        {
            ActionFilterResultUtils.SetBadRequestResult(context, "Id", "Απαιτείται αναγνωριστικό");
            return;
        }

        if (id is int colorId)
        {
            var color = await colorRepository.GetByIdAsync(colorId);

            if (color is null)
            {
                ActionFilterResultUtils.SetNotFoundResult(context, "Id",
                    "Το χρώμα με το συγκεκριμένο αναγνωριστικό δεν υπάρχει");
                return;
            }
        }

        await next();
    }
}