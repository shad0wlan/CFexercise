using Microsoft.AspNetCore.Mvc;

namespace Plastiki.Utils;

public static class ErrorProblemDetails
{
    public static ProblemDetails UnauthorizedProblemDetails(string detail)
    {
        return new ProblemDetails
        {
            Title = "Unauthorized",
            Status = StatusCodes.Status401Unauthorized,
            Detail = detail
        };
    }

    public static ProblemDetails BadRequestProblemDetails(string detail)
    {
        return new ProblemDetails
        {
            Title = "Bad Request",
            Status = StatusCodes.Status400BadRequest,
            Detail = detail
        };
    }

    public static ProblemDetails NotFoundProblemDetails(string detail)
    {
        return new ProblemDetails
        {
            Title = "Not Found",
            Status = StatusCodes.Status404NotFound,
            Detail = detail
        };
    }
}