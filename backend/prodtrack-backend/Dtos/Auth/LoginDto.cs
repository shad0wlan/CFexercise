using System.ComponentModel.DataAnnotations;

namespace Plastiki.Dtos;

public record LoginDto
{
    [Required] public string Username { get; init; }
    [Required] public string Password { get; init; }
}