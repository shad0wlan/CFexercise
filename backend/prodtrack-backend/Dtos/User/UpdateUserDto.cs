using System.ComponentModel.DataAnnotations;

namespace Plastiki.Dtos.User;

public record UpdateUserDto
{
    public string Username { get; init; }
    public string FirstName { get; init; }
    public string LastName { get; init; }

    [EmailAddress(ErrorMessage = "The Email field is not a valid e-mail address")]
    public string Email { get; init; }

    public string? Password { get; init; }
}