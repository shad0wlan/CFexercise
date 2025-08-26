using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Plastiki.Enums;

namespace Plastiki.Models;

public class Entry
{
    public int Id { get; set; }
    public EntryStatus Status { get; set; } = EntryStatus.Pending;
    public DateTime CreatedAt { get; set; } = DateTime.Now.ToUniversalTime();
    public DateTime? UpdatedAt { get; set; }
    public DateTime? ProductionDate { get; set; }
    public string PrinterText { get; set; } = String.Empty;
    public string Notes { get; set; } = String.Empty;
    public double WeightPerMeter { get; set; }
    public double WeightTotal { get; set; }
    public double Width { get; set; }
    public double Thickness { get; set; }
    public double CannonTemp { get; set; }
    public double Speed { get; set; }
    public double ColorPercentage { get; set; }
    public double? KgRecycling { get; set; }
    public int ProductionForStock { get; set; }


    public string ScrewsPerZoneJson { get; set; }
    public string KalupiTempJson { get; set; }

    [NotMapped]
    public Dictionary<int, double?>? ScrewsPerZone
    {
        get => JsonSerializer.Deserialize<Dictionary<int, double?>>(ScrewsPerZoneJson);
        set => ScrewsPerZoneJson = JsonSerializer.Serialize(value);
    }

    [NotMapped]
    public Dictionary<string, double>? KalupiTemp
    {
        get => JsonSerializer.Deserialize<Dictionary<string, double>>(KalupiTempJson);
        set => KalupiTempJson = JsonSerializer.Serialize(value);
    }

    public string UserId { get; set; }
    public User User { get; set; }

    public int MachineId { get; set; }
    public Machine Machine { get; set; }

    public int ColorId { get; set; }
    public Color Color { get; set; }

    public int? ExtraId { get; set; }
    public Extra? Extra { get; set; }

    public int PackageTypeId { get; set; }
    public PackageType PackageType { get; set; }

    public int ProductionMaterialId { get; set; }
    public ProductionMaterial ProductionMaterial { get; set; }

    public int ProductCodeId { get; set; }
    public ProductCode ProductCode { get; set; }
}