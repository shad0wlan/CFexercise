namespace Plastiki.Dtos.ProductCode;

public record ProductCodeDto
{
    public int Id { get; init; }
    public string Code { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime? UpdatedAt { get; init; }
    public double? CannonTemp { get; init; }
    public double? Speed { get; init; }
    public Dictionary<int, double?>? ScrewsPerZone { get; init; }
    public Dictionary<string, double?>? KalupiTemp { get; init; }
}