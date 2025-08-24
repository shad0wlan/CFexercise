namespace Plastiki.Dtos.Machine;

public record UpdateMachineDto
{
    public string Name { get; init; }
    public IFormFile? Image { get; init; }
}