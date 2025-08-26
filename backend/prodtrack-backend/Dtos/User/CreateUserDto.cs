using System.ComponentModel.DataAnnotations;
using Plastiki.Enums;

namespace Plastiki.Dtos.User;

public record CreateUserDto
{
    [Required] public string Username { get; init; }
    [Required] public string FirstName { get; init; }
    [Required] public string LastName { get; init; }

    [Required] public Roles Role { get; init; }

    [Required]
    [EmailAddress(ErrorMessage = "The Email field is not a valid e-mail address")]
    public string Email { get; init; }

    [Required] public string Password { get; init; }
}