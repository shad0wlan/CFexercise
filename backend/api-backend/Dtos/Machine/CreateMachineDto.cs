using System.ComponentModel.DataAnnotations;

namespace Plastiki.Dtos.Machine;

public record CreateMachineDto
{
    [Required] public string Name { get; init; }

    public IFormFile? Image { get; init; }
}