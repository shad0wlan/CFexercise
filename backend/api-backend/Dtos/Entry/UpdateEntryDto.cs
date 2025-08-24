using Plastiki.Enums;
using System.ComponentModel.DataAnnotations;

namespace Plastiki.Dtos.Entry;

public record UpdateEntryDto
{
    public DateTime? ProductionDate { get; init; }
    [EnumDataType(typeof(EntryStatus))] public EntryStatus? Status { get; init; }
    public string? ProductCode { get; init; }
    public double? WeightPerMeter { get; init; }
    public double? WeightTotal { get; init; }
    public double? Width { get; init; }
    public double? Thickness { get; init; }
    public double? CannonTemp { get; init; }
    public double? Speed { get; init; }
    public double? ColorPercentage { get; init; }
    public double? KgRecycling { get; init; }
    public int? ProductionForStock { get; init; }
    public Dictionary<int, double?>? ScrewsPerZone { get; init; }

    public Dictionary<string, double>? KalupiTemp { get; init; }

    public int? MachineId { get; init; }
    public int? ColorId { get; init; }
    public int? PackageTypeId { get; init; }
    public int? ProductionMaterialId { get; init; }
    public int? ExtraId { get; init; }


    public string? PrinterText { get; init; }
    public string? Notes { get; init; }
}