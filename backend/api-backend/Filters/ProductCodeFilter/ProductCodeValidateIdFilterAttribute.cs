using Microsoft.AspNetCore.Mvc.Filters;
using Plastiki.Interfaces;
using Plastiki.Utils;

namespace Plastiki.Filters.ProductCodeFilter;

public class ProductCodeValidateIdFilterAttribute(IProductCodeRepository productCodeRepository) : ActionFilterAttribute
{
    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (!context.ActionArguments.TryGetValue("id", out var id))
        {
            ActionFilterResultUtils.SetBadRequestResult(context, "Id", "Απαιτείται αναγνωριστικό");
            return;
        }

        if (id is int productCodeId)
        {
            var productCode = await productCodeRepository.GetByIdAsync(productCodeId);

            if (productCode is null)
            {
                ActionFilterResultUtils.SetNotFoundResult(context, "Id",
                    "Ο κωδικός προιόντος με το συγκεκριμένο αναγνωριστικό δεν υπάρχει");
                return;
            }
        }

        await next();
    }
}