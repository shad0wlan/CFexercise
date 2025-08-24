using Microsoft.AspNetCore.Mvc.Filters;
using Plastiki.Interfaces;
using Plastiki.Utils;

namespace Plastiki.Filters.UserFilter;

public class MachineValidateIdFilterAttribute(IMachineRepository machineRepository) : ActionFilterAttribute
{
    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (!context.ActionArguments.TryGetValue("id", out var id))
        {
            ActionFilterResultUtils.SetBadRequestResult(context, "Id", "Απαιτείται αναγνωριστικό");
            return;
        }

        if (id is int machineId)
        {
            var machine = await machineRepository.GetByIdAsync(machineId);

            if (machine is null)
            {
                ActionFilterResultUtils.SetNotFoundResult(context, "Id",
                    "Η μηχανή με το συγκεκριμένο αναγνωριστικό δεν υπάρχει");
                return;
            }
        }

        await next();
    }
}