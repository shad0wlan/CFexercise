using Plastiki.Dtos.Machine;
using Plastiki.Models;

namespace Plastiki.Mappers;

public static class MachineMappers
{
    public static MachineDto ToMachineDto(this Machine machine)
    {
        return new MachineDto
        {
            Id = machine.Id,
            Name = machine.Name,
            Image = machine.Image is not null ? $"/images/{machine.Image}" : null,
            CreatedAt = machine.CreatedAt
        };
    }
}