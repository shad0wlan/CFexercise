using Plastiki.Dtos.BasicInfo;
using Plastiki.Dtos.Machine;
using Plastiki.Dtos.ProductCode;
using Plastiki.Dtos.User;
using Plastiki.Enums;

namespace Plastiki.Dtos.Entry;

using Models;

public record EntryDto
{
    public int Id { get; init; }
    public EntryStatus Status { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime? UpdatedAt { get; init; }
    public DateTime? ProductionDate { get; init; }
    public double WeightPerMeter { get; init; }
    public double WeightTotal { get; init; }
    public double Width { get; init; }
    public double Thickness { get; init; }
    public double CannonTemp { get; init; }
    public double Speed { get; init; }
    public double ColorPercentage { get; init; }
    public double? KgRecycling { get; init; }
    public int ProductionForStock { get; init; }
    public Dictionary<int, double?>? ScrewsPerZone { get; init; }
    public Dictionary<string, double>? KalupiTemp { get; init; }
    public string? PrinterText { get; init; }
    public string? Notes { get; init; }

    public UserDto User { get; init; }
    public MachineDto Machine { get; init; }
    public BasicInfoDto Color { get; init; }
    public BasicInfoDto PackageType { get; init; }
    public BasicInfoDto ProductionMaterial { get; init; }

    public ProductCodeDto ProductCode { get; init; }

    public BasicInfoDto? Extra { get; init; }
}