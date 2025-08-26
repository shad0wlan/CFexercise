using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Plastiki.Dtos.BasicInfo;
using Plastiki.Filters.PackageType;
using Plastiki.Interfaces;
using Plastiki.Mappers;
using Plastiki.Models;
using Plastiki.Utils;

namespace Plastiki.Controllers;

[ApiController]
[Route("api/package-types/[Controller]")]
public class PackageTypeController(IBasicInfoRepository<PackageType> packageTypeRepository) : ControllerBase
{
    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var packageTypes = await packageTypeRepository.GetAllAsync();
        var packageTypesDto = packageTypes.Select(pt => pt.ToBasicDto());
        return Ok(packageTypesDto);
    }

    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpGet]
    [Route("{id:int}")]
    [ServiceFilter(typeof(PackageTypeValidateIdFilterAttribute))]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var packageType = await packageTypeRepository.GetByIdAsync(id);
        return Ok(packageType!.ToBasicDto());
    }
    
    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBasicInfoDto createBasicInfoDto)
    {
        var packageType = await packageTypeRepository.CreateAsync(createBasicInfoDto);

        return Created(packageType.Id.ToString(), packageType.ToBasicDto());
    }

    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpPatch]
    [Route("{id:int}")]
    [ServiceFilter(typeof(PackageTypeValidateIdFilterAttribute))]
    public async Task<IActionResult> Update([FromRoute] int id,
        [FromBody] UpdateBasicInfoDto updateBasicInfoDto)
    {
        await packageTypeRepository.UpdateAsync(id, updateBasicInfoDto);
        return NoContent();
    }

    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpDelete]
    [Route("{id:int}")]
    [ServiceFilter(typeof(PackageTypeValidateIdFilterAttribute))]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        try
        {
            await packageTypeRepository.DeleteAsync(id);
            return NoContent();
        }
        catch (Exception exception)
        {
            if (exception is DbUpdateException && exception.InnerException is PostgresException { SqlState: "23503" })
                return Conflict(new
                {
                    message = "Δεν είναι δυνατή η διαγραφή του τύπου πακέτου επειδή αναφέρεται από άλλες εγγραφές."
                });

            return StatusCode(500, exception);
        }
    }
}