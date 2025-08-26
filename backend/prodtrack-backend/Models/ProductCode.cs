using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace Plastiki.Models;

[Index(nameof(Code), IsUnique = true)]
public class ProductCode
{
    public int Id { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now.ToUniversalTime();

    public DateTime? UpdatedAt { get; set; }
    public String Code { get; set; }

    public double? CannonTemp { get; set; } = null;

    public double? Speed { get; set; } = null;

    public string? ScrewsPerZoneJson { get; set; } = null;
    public string? KalupiTempJson { get; set; } = null;

    [NotMapped]
    public Dictionary<int, double?>? ScrewsPerZone
    {
        get => JsonSerializer.Deserialize<Dictionary<int, double?>>(ScrewsPerZoneJson ?? String.Empty);
        set => ScrewsPerZoneJson = JsonSerializer.Serialize(value);
    }

    [NotMapped]
    public Dictionary<string, double?>? KalupiTemp
    {
        get => JsonSerializer.Deserialize<Dictionary<string, double?>>(KalupiTempJson ?? string.Empty);
        set => KalupiTempJson = JsonSerializer.Serialize(value);
    }

    public virtual ICollection<Entry> Entries { get; set; } = new List<Entry>();
}