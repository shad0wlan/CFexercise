using System.ComponentModel.DataAnnotations;

namespace Plastiki.Dtos.Entry;

public record CreateEntryDto
{
    // Required
    [Required] public double WeightPerMeter { get; init; }
    [Required] public double WeightTotal { get; init; }
    [Required] public double Width { get; init; }
    [Required] public double Thickness { get; init; }
    [Required] public double CannonTemp { get; init; }
    [Required] public double Speed { get; init; }
    [Required] public double ColorPercentage { get; init; }
    [Required] public int ProductionForStock { get; init; }
    [Required] public Dictionary<int, double?> ScrewsPerZone { get; init; }

    [Required] public Dictionary<string, double> KalupiTemp { get; init; }


    // Foreign Keys
    [Required] public int MachineId { get; init; }
    [Required] public int ColorId { get; init; }
    [Required] public int PackageTypeId { get; init; }
    [Required] public int ProductionMaterialId { get; init; }

    [Required] public int ProductCodeId { get; init; }

    public int? ExtraId { get; init; }


    // Optional Fields
    public DateTime? ProductionDate { get; init; }
    public double? KgRecycling { get; init; }
    public string? PrinterText { get; init; }
    public string? Notes { get; init; }
}