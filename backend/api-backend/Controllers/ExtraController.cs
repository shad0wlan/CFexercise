using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Plastiki.Dtos.BasicInfo;
using Plastiki.Filters.ExtraFilter;
using Plastiki.Interfaces;
using Plastiki.Mappers;
using Plastiki.Models;
using Plastiki.Utils;

namespace Plastiki.Controllers;

[ApiController]
[Route("api/extras/[Controller]")]
public class ExtraController(IBasicInfoRepository<Extra> extraRepository) : ControllerBase
{
    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var extras = await extraRepository.GetAllAsync();
        var extrasDto = extras.Select(e => e.ToBasicDto());
        return Ok(extrasDto);
    }

    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpGet]
    [Route("{id:int}")]
    [ServiceFilter(typeof(ExtraValidateIdFilterAttribute))]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var extra = await extraRepository.GetByIdAsync(id);
        return Ok(extra!.ToBasicDto());
    }

    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBasicInfoDto createBasicInfoDto)
    {
        var extra = await extraRepository.CreateAsync(createBasicInfoDto);

        return Created(extra.Id.ToString(), extra.ToBasicDto());
    }
    
    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpPatch]
    [Route("{id:int}")]
    [ServiceFilter(typeof(ExtraValidateIdFilterAttribute))]
    public async Task<IActionResult> Update([FromRoute] int id,
        [FromBody] UpdateBasicInfoDto updateBasicInfoDto)
    {
        await extraRepository.UpdateAsync(id, updateBasicInfoDto);
        return NoContent();
    }

    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpDelete]
    [Route("{id:int}")]
    [ServiceFilter(typeof(ExtraValidateIdFilterAttribute))]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        await extraRepository.DeleteAsync(id);
        return NoContent();
    }
}