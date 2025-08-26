using Microsoft.AspNetCore.Mvc.Filters;
using Plastiki.Interfaces;
using Plastiki.Models;
using Plastiki.Utils;

namespace Plastiki.Filters.UserFilter;

public class ProductionMaterialValidateIdFilterAttribute(
    IBasicInfoRepository<ProductionMaterial> productionMaterialRepository)
    : ActionFilterAttribute
{
    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (!context.ActionArguments.TryGetValue("id", out var id))
        {
            ActionFilterResultUtils.SetBadRequestResult(context, "Id", "Απαιτείται αναγνωριστικό");
            return;
        }

        if (id is int productionMaterialId)
        {
            var productionMaterial = await productionMaterialRepository.GetByIdAsync(productionMaterialId);

            if (productionMaterial is null)
            {
                ActionFilterResultUtils.SetNotFoundResult(context, "Id",
                    "Το Υλικό παραγωγής με το συγκεκριμένο αναγνωριστικό δεν υπάρχει");
                return;
            }
        }

        await next();
    }
}