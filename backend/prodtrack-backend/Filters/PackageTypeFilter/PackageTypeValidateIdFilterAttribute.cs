using Microsoft.AspNetCore.Mvc.Filters;
using Plastiki.Interfaces;
using Plastiki.Utils;

namespace Plastiki.Filters.PackageType;

public class PackageTypeValidateIdFilterAttribute(IBasicInfoRepository<Models.PackageType> packageTypeRepository)
    : ActionFilterAttribute
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
            var packageType = await packageTypeRepository.GetByIdAsync(colorId);

            if (packageType is null)
            {
                ActionFilterResultUtils.SetNotFoundResult(context, "Id",
                    "Ο τύπος συσκευασίας με το συγκεκριμένο αναγνωριστικό δεν υπάρχει");
                return;
            }
        }

        await next();
    }
}