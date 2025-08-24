namespace Plastiki.Dtos.Machine;

public record MachineDto
{
    public int Id { get; init; }
    public string Name { get; init; }
    public string? Image { get; init; }

    public DateTime CreatedAt { get; init; }
}