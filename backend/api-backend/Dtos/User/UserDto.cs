namespace Plastiki.Dtos.User;

public record UserDto(
    string Id,
    string Username,
    string FirstName,
    string LastName,
    string Email,
    string Role
);