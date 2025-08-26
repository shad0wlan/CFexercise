using System.Text.Json;
using Microsoft.AspNetCore.Identity;
using Plastiki.Dtos.Entry;
using Plastiki.Models;

namespace Plastiki.Mappers;

public static class EntryMappers
{
    public static EntryDto ToEntryDto(this Entry entry, UserManager<User> userManager)
    {
        return new EntryDto
        {
            Id = entry.Id,
            Status = entry.Status,
            CreatedAt = entry.CreatedAt,
            UpdatedAt = entry.UpdatedAt,
            ProductionDate = entry.ProductionDate,
            WeightPerMeter = entry.WeightPerMeter,
            WeightTotal = entry.WeightTotal,
            Width = entry.Width,
            Thickness = entry.Thickness,
            CannonTemp = entry.CannonTemp,
            Speed = entry.Speed,
            ColorPercentage = entry.ColorPercentage,
            KgRecycling = entry.KgRecycling,
            ProductionForStock = entry.ProductionForStock,
            ScrewsPerZone = entry.ScrewsPerZone,
            KalupiTemp = entry.KalupiTemp,
            PrinterText = entry.PrinterText,
            User = entry.User.ToUserDto(userManager),
            Notes = entry.Notes,
            Machine = entry.Machine.ToMachineDto(),
            Color = entry.Color.ToBasicDto(),
            PackageType = entry.PackageType.ToBasicDto(),
            ProductionMaterial = entry.ProductionMaterial.ToBasicDto(),
            Extra = entry.Extra?.ToBasicDto(),
            ProductCode = entry.ProductCode.ToProductCodeDto(),
        };
    }

    public static Entry ToEntryFromCreateDto(this CreateEntryDto createEntryDto, string userId)
    {
        return new Entry
        {
            ProductionDate = createEntryDto.ProductionDate,
            PrinterText = createEntryDto.PrinterText ?? "",
            Notes = createEntryDto.Notes ?? "",
            WeightPerMeter = createEntryDto.WeightPerMeter,
            WeightTotal = createEntryDto.WeightTotal,
            Width = createEntryDto.Width,
            Thickness = createEntryDto.Thickness,
            CannonTemp = createEntryDto.CannonTemp,
            Speed = createEntryDto.Speed,
            ColorPercentage = createEntryDto.ColorPercentage,
            KgRecycling = createEntryDto.KgRecycling,
            ProductionForStock = createEntryDto.ProductionForStock,
            ScrewsPerZoneJson = JsonSerializer.Serialize(createEntryDto.ScrewsPerZone),
            KalupiTempJson = JsonSerializer.Serialize(createEntryDto.KalupiTemp),
            MachineId = createEntryDto.MachineId,
            ColorId = createEntryDto.ColorId,
            ExtraId = createEntryDto.ExtraId,
            PackageTypeId = createEntryDto.PackageTypeId,
            ProductionMaterialId = createEntryDto.ProductionMaterialId,
            ProductCodeId = createEntryDto.ProductCodeId,
            UserId = userId
        };
    }
}