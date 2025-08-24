using Microsoft.AspNetCore.Mvc.Filters;
using Plastiki.Interfaces;
using Plastiki.Models;
using Plastiki.Utils;

namespace Plastiki.Filters.ExtraFilter;

public class ExtraValidateIdFilterAttribute(IBasicInfoRepository<Extra> extraRepository) : ActionFilterAttribute
{
    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (!context.ActionArguments.TryGetValue("id", out var id))
        {
            ActionFilterResultUtils.SetBadRequestResult(context, "Id", "Απαιτείται αναγνωριστικό");
            return;
        }

        if (id is int extraId)
        {
            var extra = await extraRepository.GetByIdAsync(extraId);

            if (extra is null)
            {
                ActionFilterResultUtils.SetNotFoundResult(context, "Id",
                    "Η επιπλέον επιλογή με το συγκεκριμένο αναγνωριστικό δεν υπάρχει");
                return;
            }
        }

        await next();
    }
}