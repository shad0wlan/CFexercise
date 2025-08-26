using System.ComponentModel.DataAnnotations;

namespace Plastiki.Dtos.Machine;

public record CreateProductCodeDto
{
    [Required] public string Code { get; init; }

    public double? CannonTemp { get; init; }
    public double? Speed { get; init; }

    public Dictionary<int, double?>? ScrewsPerZone { get; init; }
    public Dictionary<string, double?>? KalupiTemp { get; init; }
}