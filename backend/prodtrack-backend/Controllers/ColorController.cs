using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Plastiki.Dtos.BasicInfo;
using Plastiki.Filters.ColorFilter;
using Plastiki.Interfaces;
using Plastiki.Mappers;
using Plastiki.Models;
using Plastiki.Utils;

namespace Plastiki.Controllers;

[ApiController]
[Route("api/colors/[Controller]")]
public class ColorController(IBasicInfoRepository<Color> colorRepository) : ControllerBase
{
    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var colors = await colorRepository.GetAllAsync();
        var colorsDto = colors.Select(c => c.ToBasicDto());
        return Ok(colorsDto);
    }

    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpGet]
    [Route("{id:int}")]
    [ServiceFilter(typeof(ColorValidateIdFilterAttribute))]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var color = await colorRepository.GetByIdAsync(id);
        return Ok(color!.ToBasicDto());
    }

    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBasicInfoDto createBasicInfoDto)
    {
        var color = await colorRepository.CreateAsync(createBasicInfoDto);

        return Created(color.Id.ToString(), color.ToBasicDto());
    }

    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpPatch]
    [Route("{id:int}")]
    [ServiceFilter(typeof(ColorValidateIdFilterAttribute))]
    public async Task<IActionResult> Update([FromRoute] int id,
        [FromBody] UpdateBasicInfoDto updateBasicInfoDto)
    {
        await colorRepository.UpdateAsync(id, updateBasicInfoDto);
        return NoContent();
    }

    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpDelete]
    [Route("{id:int}")]
    [ServiceFilter(typeof(ColorValidateIdFilterAttribute))]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        try
        {
            await colorRepository.DeleteAsync(id);
            return NoContent();
        }
        catch (Exception exception)
        {
            if (exception is DbUpdateException && exception.InnerException is PostgresException { SqlState: "23503" })
                return Conflict(new
                    { message = "Δεν είναι δυνατή η διαγραφή του χρώματος επειδή αναφέρεται από άλλες εγγραφές." });

            return StatusCode(500, exception);
        }
    }
}