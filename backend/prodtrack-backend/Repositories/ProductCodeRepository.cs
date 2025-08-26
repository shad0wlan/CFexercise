using Microsoft.EntityFrameworkCore;
using Plastiki.Dtos.Machine;
using Plastiki.Dtos.ProductCode;
using Plastiki.Interfaces;
using Plastiki.Mappers;
using Plastiki.Models;
using Plastiki.Properties.Database;

namespace Plastiki.Service;

public class ProductCodeRepository(ApplicationDbContext dbContext) : IProductCodeRepository
{
    public async Task<List<ProductCode>> GetAllAsync()
    {
        return await dbContext.ProductCodes.OrderByDescending(p => p.UpdatedAt.HasValue)
            .ThenByDescending(p => p.UpdatedAt).ToListAsync();
    }

    public async Task<ProductCode?> GetByIdAsync(int id)
    {
        return await dbContext.ProductCodes.FindAsync(id);
    }

    public async Task<ProductCode> CreateAsync(CreateProductCodeDto createProductCodeDto)
    {
        var productCode = createProductCodeDto.ToProductCodeFromCreateDto();
        await dbContext.ProductCodes.AddAsync(productCode);
        await dbContext.SaveChangesAsync();

        return productCode;
    }


    public async Task UpdateAsync(UpdateProductCodeDto updateProductCodeDto, int id)
    {
        var productCode = (await GetByIdAsync(id))!;

        var productCodeProperties = typeof(ProductCode).GetProperties();
        var dtoProperties = typeof(UpdateProductCodeDto).GetProperties();

        foreach (var dtoProperty in dtoProperties)
        {
            var productCodeProperty =
                productCodeProperties.FirstOrDefault(p =>
                    p.Name.Equals(dtoProperty.Name, StringComparison.OrdinalIgnoreCase));
            if (productCodeProperty is null) continue;

            var value = dtoProperty.GetValue(updateProductCodeDto);
            if (value is not null)
            {
                productCodeProperty.SetValue(productCode, value);
            }
        }

        productCode.UpdatedAt = DateTime.Now.ToUniversalTime();

        await dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var productCode = await GetByIdAsync(id);
        dbContext.Remove(productCode!);
        await dbContext.SaveChangesAsync();
    }
}