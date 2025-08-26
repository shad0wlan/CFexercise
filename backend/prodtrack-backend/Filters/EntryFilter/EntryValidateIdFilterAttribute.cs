using Microsoft.AspNetCore.Mvc.Filters;
using Plastiki.Interfaces;
using Plastiki.Utils;

namespace Plastiki.Filters.EntryFilter;

public class EntryValidateIdFilterAttribute(IEntryRepository entryRepository) : ActionFilterAttribute
{
    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (!context.ActionArguments.TryGetValue("id", out var id))
        {
            ActionFilterResultUtils.SetBadRequestResult(context, "Id", "Απαιτείται αναγνωριστικό");
            return;
        }

        if (id is int entryId)
        {
            var entry = await entryRepository.GetByIdAsync(entryId);

            if (entry is null)
            {
                ActionFilterResultUtils.SetNotFoundResult(context, "Id",
                    "Η καταχώρηση με το συγκεκριμένο αναγνωριστικό δεν υπάρχει");
                return;
            }
        }

        await next();
    }
}