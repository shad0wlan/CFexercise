using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;
using Plastiki.Dtos.Entry;
using Plastiki.Filters.EntryFilter;
using Plastiki.Interfaces;
using Plastiki.Mappers;
using Plastiki.Models;
using Plastiki.Utils;

namespace Plastiki.Controllers;

[Authorize]
[ApiController]
[Route("api/entries/[Controller]")]
public class EntryController(IEntryRepository entryRepository, UserManager<User> userManager) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string status)
    {
        var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sid);
        var userRole = User.FindFirstValue(ClaimTypes.Role);

        if (userId is null || userRole is null)
        {
            return NotFound(ErrorProblemDetails.NotFoundProblemDetails("Ο χρήστης δεν βρέθηκε"));
        }

        var entries = await entryRepository.GetAllAsync(userId, userRole, status);
        var entriesDto = entries.Select(e => e.ToEntryDto(userManager));
        return Ok(entriesDto);
    }

    [HttpGet]
    [Route("{id:int}")]
    [ServiceFilter(typeof(EntryValidateIdFilterAttribute))]
    [ServiceFilter(typeof(EntryValidateRoleFilterAttribute))]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var entry = await entryRepository.GetByIdAsync(id);

        return Ok(entry!.ToEntryDto(userManager));
    }

    [HttpPost]
    [ServiceFilter(typeof(EntryValidateForeignKeysFilterAttribute))]
    public async Task<IActionResult> Create([FromBody] CreateEntryDto createEntryDto)
    {
        var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sid);

        if (userId is null)
        {
            return NotFound(ErrorProblemDetails.NotFoundProblemDetails("Ο χρήστης δεν βρέθηκε"));
        }

        var entry = await entryRepository.CreateAsync(createEntryDto, userId);
        return Created(entry.Id.ToString(), entry.ToEntryDto(userManager));
    }

    [HttpPatch]
    [Route("{id:int}")]
    [ServiceFilter(typeof(EntryValidateIdFilterAttribute))]
    [ServiceFilter(typeof(EntryValidateRoleFilterAttribute))]
    [ServiceFilter(typeof(EntryValidateForeignKeysFilterAttribute))]
    public async Task<IActionResult> Update([FromBody] UpdateEntryDto updateEntryDto, [FromRoute] int id)
    {
        await entryRepository.UpdateAsync(updateEntryDto, id);
        return NoContent();
    }

    [HttpDelete]
    [Route("{id:int}")]
    [ServiceFilter(typeof(EntryValidateIdFilterAttribute))]
    [ServiceFilter(typeof(EntryValidateRoleFilterAttribute))]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        await entryRepository.DeleteAsync(id);
        return NoContent();
    }
}