using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Plastiki.Results;

namespace Plastiki.Utils;

public static class ActionFilterResultUtils
{
    public static void SetBadRequestResult(ActionExecutingContext context, string key, string errorMessage)
    {
        context.ModelState.AddModelError(key, errorMessage);
        var problemDetails = new ValidationProblemDetails(context.ModelState)
        {
            Status = StatusCodes.Status400BadRequest
        };
        context.Result = new BadRequestObjectResult(problemDetails);
    }

    public static void SetForbiddenResult(ActionExecutingContext context, string key, string errorMessage)
    {
        context.ModelState.AddModelError(key, errorMessage);
        var problemDetails = new ValidationProblemDetails(context.ModelState)
        {
            Status = StatusCodes.Status403Forbidden
        };
        context.Result = new ForbiddenObjectResult(problemDetails);
    }

    public static void SetNotFoundResult(ActionExecutingContext context, string key, string errorMessage)
    {
        context.ModelState.AddModelError(key, errorMessage);
        var problemDetails = new ValidationProblemDetails(context.ModelState)
        {
            Status = StatusCodes.Status404NotFound
        };
        context.Result = new NotFoundObjectResult(problemDetails);
    }
}