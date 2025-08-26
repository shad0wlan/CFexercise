using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Plastiki.Dtos.Machine;
using Plastiki.Dtos.ProductCode;
using Plastiki.Filters.ProductCodeFilter;
using Plastiki.Interfaces;
using Plastiki.Mappers;
using Plastiki.Utils;

namespace Plastiki.Controllers;

[Authorize]
[ApiController]
[Route("api/product-codes/[Controller]")]
public class ProductCodeController(IProductCodeRepository productCodeRepository) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
        var productCodes = await productCodeRepository.GetAllAsync();
        var productCodesDto = productCodes.Select(pc => pc.ToProductCodeDto());
        return Ok(productCodesDto);
    }

    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpGet]
    [Route("{id:int}")]
    [ServiceFilter(typeof(ProductCodeValidateIdFilterAttribute))]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var productCode = await productCodeRepository.GetByIdAsync(id);
        return Ok(productCode!.ToProductCodeDto());
    }

    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProductCodeDto createProductCodeDto)
    {
        try
        {
            var productCode = await productCodeRepository.CreateAsync(createProductCodeDto);

            return Created(productCode.Id.ToString(), productCode.ToProductCodeDto());
        }
        catch (Exception exception)
        {
            if (exception is DbUpdateException && exception.InnerException is PostgresException { SqlState: "23505" })
                return Conflict(new { message = "Ο κωδικός προιόντος υπάρχει ήδη." });

            return StatusCode(500, exception);
        }
    }

    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpPatch]
    [Route("{id:int}")]
    [ServiceFilter(typeof(ProductCodeValidateIdFilterAttribute))]
    public async Task<IActionResult> Update([FromBody] UpdateProductCodeDto updateProductCodeDto, [FromRoute] int id)
    {
        try
        {
            await productCodeRepository.UpdateAsync(updateProductCodeDto, id);
            return NoContent();
        }
        catch (Exception exception)
        {
            if (exception is DbUpdateException && exception.InnerException is PostgresException { SqlState: "23505" })
                return Conflict(new { message = "Ο κωδικός προιόντος υπάρχει ήδη." });

            return StatusCode(500, exception);
        }
    }

    [Authorize(Roles = $"{RolesUtils.Admin},{RolesUtils.Operator}")]
    [HttpDelete]
    [Route("{id:int}")]
    [ServiceFilter(typeof(ProductCodeValidateIdFilterAttribute))]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        try
        {
            await productCodeRepository.DeleteAsync(id);
            return NoContent();
        }
        catch (Exception exception)
        {
            if (exception is DbUpdateException && exception.InnerException is PostgresException { SqlState: "23503" })
                return Conflict(new
                {
                    message = "Δεν είναι δυνατή η διαγραφή του κωδικου προιοντος επειδή αναφέρεται από άλλες εγγραφές."
                });

            return StatusCode(500, exception);
        }
    }
}