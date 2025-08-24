namespace Plastiki.Dtos.ProductCode;

public record UpdateProductCodeDto
{
    public string? Code { get; init; }

    public double? CannonTemp { get; init; }
    public double? Speed { get; init; }

    public Dictionary<int, double?>? ScrewsPerZone { get; init; }
    public Dictionary<string, double?>? KalupiTemp { get; init; }
}