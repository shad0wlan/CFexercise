using Plastiki.Dtos.Machine;
using Plastiki.Dtos.ProductCode;
using Plastiki.Models;

namespace Plastiki.Mappers;

public static class ProductCodeMappers
{
    public static ProductCodeDto ToProductCodeDto(this ProductCode productCode)
    {
        return new ProductCodeDto
        {
            Id = productCode.Id,
            Code = productCode.Code,
            CreatedAt = productCode.CreatedAt,
            UpdatedAt = productCode.UpdatedAt,
            Speed = productCode.Speed,
            CannonTemp = productCode.CannonTemp,
            ScrewsPerZone = productCode.ScrewsPerZone,
            KalupiTemp = productCode.KalupiTemp,
        };
    }

    public static ProductCode ToProductCodeFromCreateDto(this CreateProductCodeDto createProductCode)
    {
        return new ProductCode
        {
            Code = createProductCode.Code,
            Speed = createProductCode.Speed,
            CannonTemp = createProductCode.CannonTemp,
            ScrewsPerZone = createProductCode.ScrewsPerZone,
            KalupiTemp = createProductCode.KalupiTemp
        };
    }
}