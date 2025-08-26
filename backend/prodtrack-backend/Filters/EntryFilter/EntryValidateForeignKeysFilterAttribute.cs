using Microsoft.AspNetCore.Mvc.Filters;
using Plastiki.Dtos.Entry;
using Plastiki.Interfaces;
using Plastiki.Models;
using Plastiki.Utils;

namespace Plastiki.Filters.EntryFilter;

public class EntryValidateForeignKeysFilterAttribute(
    IMachineRepository machineRepository,
    IBasicInfoRepository<Color> colorRepository,
    IBasicInfoRepository<Models.PackageType> packageTypeRepository,
    IBasicInfoRepository<ProductionMaterial> productionMaterialRepository,
    IBasicInfoRepository<Extra> extraRepository
) : ActionFilterAttribute

{
    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (context.ActionArguments.TryGetValue("createEntryDto", out var createEntryDtoObj) &&
            createEntryDtoObj is CreateEntryDto createEntryDto)
        {
            var colorId = createEntryDto.ColorId;
            var color = await colorRepository.GetByIdAsync(colorId);
            if (color is null)
            {
                ActionFilterResultUtils.SetNotFoundResult(context, "colorId",
                    "Το χρώμα με το συγκεκριμένο αναγνωριστικό δεν υπάρχει");
                return;
            }

            var machineId = createEntryDto.MachineId;
            var machine = await machineRepository.GetByIdAsync(machineId);
            if (machine is null)
            {
                ActionFilterResultUtils.SetNotFoundResult(context, "machineId",
                    "Η μηχανή με το συγκεκριμένο αναγνωριστικό δεν υπάρχει");
                return;
            }

            var packageTypeId = createEntryDto.PackageTypeId;
            var packageType = await packageTypeRepository.GetByIdAsync(packageTypeId);
            if (packageType is null)
            {
                ActionFilterResultUtils.SetNotFoundResult(context, "packageTypeId",
                    "Ο τύπος πακέτου με το συγκεκριμένο αναγνωριστικό δεν υπάρχει");
                return;
            }

            var productionMaterialId = createEntryDto.ProductionMaterialId;
            var productionMaterial = await productionMaterialRepository.GetByIdAsync(productionMaterialId);
            if (productionMaterial is null)
            {
                ActionFilterResultUtils.SetNotFoundResult(context, "productionMaterialId",
                    "Το υλικό παραγωγής με το συγκεκριμένο αναγνωριστικό δεν υπάρχει");
                return;
            }

            var extraId = createEntryDto.ExtraId;
            if (extraId is not null)
            {
                var extra = await extraRepository.GetByIdAsync(extraId.Value);
                if (extra is null)
                {
                    ActionFilterResultUtils.SetNotFoundResult(context, "extraId",
                        "Η πρόσθετη επιλογή με το συγκεκριμένο αναγνωριστικό δεν υπάρχει");
                    return;
                }
            }
        }

        if (context.ActionArguments.TryGetValue("updateEntryDto", out var updateEntryDtoObj) &&
            updateEntryDtoObj is UpdateEntryDto updateEntryDto)
        {
            var colorId = updateEntryDto.ColorId;
            if (colorId is not null)
            {
                var color = await colorRepository.GetByIdAsync(colorId.Value);
                if (color is null)
                {
                    ActionFilterResultUtils.SetNotFoundResult(context, "colorId",
                        "Το χρώμα με το συγκεκριμένο αναγνωριστικό δεν υπάρχει");
                    return;
                }
            }


            var machineId = updateEntryDto.MachineId;
            if (machineId is not null)
            {
                var machine = await machineRepository.GetByIdAsync(machineId.Value);
                if (machine is null)
                {
                    ActionFilterResultUtils.SetNotFoundResult(context, "machineId",
                        "Η μηχανή με το συγκεκριμένο αναγνωριστικό δεν υπάρχει");
                    return;
                }
            }


            var packageTypeId = updateEntryDto.PackageTypeId;
            if (packageTypeId is not null)
            {
                var packageType = await packageTypeRepository.GetByIdAsync(packageTypeId.Value);
                if (packageType is null)
                {
                    ActionFilterResultUtils.SetNotFoundResult(context, "packageTypeId",
                        "Ο τύπος πακέτου με το συγκεκριμένο αναγνωριστικό δεν υπάρχει");
                    return;
                }
            }

            var productionMaterialId = updateEntryDto.ProductionMaterialId;
            if (productionMaterialId is not null)
            {
                var productionMaterial = await productionMaterialRepository.GetByIdAsync(productionMaterialId.Value);
                if (productionMaterial is null)
                {
                    ActionFilterResultUtils.SetNotFoundResult(context, "productionMaterialId",
                        "Το υλικό παραγωγής με το συγκεκριμένο αναγνωριστικό δεν υπάρχει");
                    return;
                }
            }

            var extraId = updateEntryDto.ExtraId;
            if (extraId is not null)
            {
                var extra = await extraRepository.GetByIdAsync(extraId.Value);
                if (extra is null)
                {
                    ActionFilterResultUtils.SetNotFoundResult(context, "extraId",
                        "Η πρόσθετη επιλογή με το συγκεκριμένο αναγνωριστικό δεν υπάρχει");
                    return;
                }
            }
        }


        await next();
    }
}