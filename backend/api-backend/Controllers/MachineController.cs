using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Plastiki.Dtos.Machine;
using Plastiki.Filters.UserFilter;
using Plastiki.Interfaces;
using Plastiki.Mappers;
using Plastiki.Models;
using Plastiki.Utils;

namespace Plastiki.Controllers;

[Authorize]
[ApiController]
[Route("api/machines/[Controller]")]
public class MachineController(IMachineRepository machineRepository, IFileService fileService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var machines = await machineRepository.GetAllAsync();
        var machinesDto = machines.Select(m => m.ToMachineDto());
        return Ok(machinesDto);
    }

    [Authorize(Roles = RolesUtils.Admin)]
    [HttpGet]
    [Route("{id:int}")]
    [ServiceFilter(typeof(MachineValidateIdFilterAttribute))]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var machine = await machineRepository.GetByIdAsync(id);
        return Ok(machine!.ToMachineDto());
    }

    [Authorize(Roles = RolesUtils.Admin)]
    [HttpPost]
    public async Task<IActionResult> Create([FromForm] CreateMachineDto createMachineDto)
    {
        try
        {
            if (FileUtils.InvalidFileSize(createMachineDto.Image?.Length))
            {
                var badRequestProblemDetails =
                    ErrorProblemDetails.BadRequestProblemDetails("Το αρχείο δεν πρέπει να είναι μεγαλύτερο απο 1 MB");
                return BadRequest(badRequestProblemDetails);
            }


            var createdImageName = createMachineDto.Image is not null
                ? await fileService.SaveFileAsync(createMachineDto.Image, FileUtils.AllowedImageExtensions)
                : null;

            var newMachine = new Machine
            {
                Name = createMachineDto.Name,
                Image = createdImageName
            };

            var machine = await machineRepository.CreateAsync(newMachine);
            return CreatedAtAction(nameof(GetById), new { id = machine.Id }, machine.ToMachineDto());
        }
        catch (Exception ex)
        {
            switch (ex)
            {
                case DbUpdateException when ex.InnerException is PostgresException { SqlState: "23505" }:
                    return Conflict(new { message = "Η μηχανή με αυτό το όνομα υπάρχει ήδη" });
                case BadHttpRequestException:
                {
                    var problemDetails = ErrorProblemDetails.BadRequestProblemDetails(ex.Message);
                    return BadRequest(problemDetails);
                }
                default:
                    return StatusCode(500, ex);
            }
        }
    }

    [Authorize(Roles = RolesUtils.Admin)]
    [HttpPatch]
    [Route("{id:int}")]
    [ServiceFilter(typeof(MachineValidateIdFilterAttribute))]
    public async Task<IActionResult> Update([FromRoute] int id, [FromForm] UpdateMachineDto updateMachineDto)
    {
        try
        {
            if (FileUtils.InvalidFileSize(updateMachineDto.Image?.Length))
            {
                var badRequestProblemDetails =
                    ErrorProblemDetails.BadRequestProblemDetails("Το αρχείο δεν πρέπει να είναι μεγαλύτερο απο 1 MB");
                return BadRequest(badRequestProblemDetails);
            }


            if (updateMachineDto.Image is not null)
            {
                var existingMachine = await machineRepository.GetByIdAsync(id);

                if (existingMachine?.Image is not null)
                {
                    fileService.DeleteFile(existingMachine.Image);
                }
            }

            var createdImageName = updateMachineDto.Image is not null
                ? await fileService.SaveFileAsync(updateMachineDto.Image, FileUtils.AllowedImageExtensions)
                : null;

            var newMachine = new Machine
            {
                Name = updateMachineDto.Name,
                Image = createdImageName
            };

            await machineRepository.UpdateAsync(id, newMachine);

            return NoContent();
        }
        catch (Exception ex)
        {
            switch (ex)
            {
                case BadHttpRequestException:
                {
                    var problemDetails = ErrorProblemDetails.BadRequestProblemDetails(ex.Message);
                    return BadRequest(problemDetails);
                }
                default:
                    return StatusCode(500, ex);
            }
        }
    }

    [Authorize(Roles = RolesUtils.Admin)]
    [HttpDelete]
    [Route("{id:int}")]
    [ServiceFilter(typeof(MachineValidateIdFilterAttribute))]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        try
        {
            var machine = await machineRepository.DeleteAsync(id);
            if (machine.Image is not null)
            {
                fileService.DeleteFile(machine.Image);
            }

            return NoContent();
        }
        catch (Exception exception)
        {
            if (exception is DbUpdateException && exception.InnerException is PostgresException { SqlState: "23503" })
                return Conflict(new
                    { message = "Δεν είναι δυνατή η διαγραφή της μηχανής επειδή αναφέρεται από άλλες εγγραφές." });

            return StatusCode(500, exception);
        }
    }
}