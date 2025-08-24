using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Plastiki.Dtos.BasicInfo;
using Plastiki.Filters.UserFilter;
using Plastiki.Interfaces;
using Plastiki.Mappers;
using Plastiki.Models;
using Plastiki.Utils;

namespace Plastiki.Controllers;

[ApiController]
[Route("api/production-materials/[Controller]")]
public class ProductionMaterialController(IBasicInfoRepository<ProductionMaterial> productionMaterialRepository)
    : ControllerBase
{
    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var productionMaterials = await productionMaterialRepository.GetAllAsync();
        var productionMaterialsDto = productionMaterials.Select(pm => pm.ToBasicDto());
        return Ok(productionMaterialsDto);
    }

    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpGet]
    [Route("{id:int}")]
    [ServiceFilter(typeof(ProductionMaterialValidateIdFilterAttribute))]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var productionMaterial = await productionMaterialRepository.GetByIdAsync(id);
        return Ok(productionMaterial!.ToBasicDto());
    }
    
    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBasicInfoDto createBasicInfoDto)
    {
        var productionMaterial = await productionMaterialRepository.CreateAsync(createBasicInfoDto);

        return Created(productionMaterial.Id.ToString(), productionMaterial.ToBasicDto());
    }
    
    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpPatch]
    [Route("{id:int}")]
    [ServiceFilter(typeof(ProductionMaterialValidateIdFilterAttribute))]
    public async Task<IActionResult> Update([FromRoute] int id,
        [FromBody] UpdateBasicInfoDto updateBasicInfoDto)
    {
        await productionMaterialRepository.UpdateAsync(id, updateBasicInfoDto);
        return NoContent();
    }
    
    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpDelete]
    [Route("{id:int}")]
    [ServiceFilter(typeof(ProductionMaterialValidateIdFilterAttribute))]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        try
        {
            await productionMaterialRepository.DeleteAsync(id);
            return NoContent();
        }
        catch (Exception exception)
        {
            if (exception is DbUpdateException && exception.InnerException is PostgresException { SqlState: "23503" })
                return Conflict(new
                {
                    message = "Δεν είναι δυνατή η διαγραφή του υλικού παραγωγής επειδή αναφέρεται από άλλες εγγραφές."
                });

            return StatusCode(500, exception);
        }
    }
}