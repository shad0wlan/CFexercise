using Plastiki.Dtos.BasicInfo;
using Plastiki.Models;

namespace Plastiki.Mappers;

public static class BasicInfoMappers
{
    public static BasicInfoDto ToBasicDto<T>(this T basicInfo) where T : class
    {
        var idProperty = typeof(T).GetProperty("Id");
        var nameProperty = typeof(T).GetProperty("Name");

        if (idProperty is null || nameProperty is null)
        {
            throw new InvalidOperationException("Type T must have Id and Name properties.");
        }

        return new BasicInfoDto
        {
            Id = (int)idProperty.GetValue(basicInfo)!,
            Name = (string)nameProperty.GetValue(basicInfo)!
        };
    }

    public static Color ToColorFromCreateDto(this CreateBasicInfoDto createBasicInfoDto)
    {
        return new Color
        {
            Name = createBasicInfoDto.Name
        };
    }

    public static PackageType ToPackageTypeFromCreateDto(this CreateBasicInfoDto createBasicInfoDto)
    {
        return new PackageType
        {
            Name = createBasicInfoDto.Name
        };
    }

    public static ProductionMaterial ToProductionMaterialFromCreateDto(this CreateBasicInfoDto createBasicInfoDto)
    {
        return new ProductionMaterial
        {
            Name = createBasicInfoDto.Name
        };
    }

    public static Extra ToExtraFromCreateDto(this CreateBasicInfoDto createBasicInfoDto)
    {
        return new Extra
        {
            Name = createBasicInfoDto.Name
        };
    }
}