using Microsoft.EntityFrameworkCore;
using Plastiki.Dtos.BasicInfo;
using Plastiki.Interfaces;
using Plastiki.Mappers;
using Plastiki.Models;
using Plastiki.Properties.Database;

namespace Plastiki.Service;

public class ProductionMaterialRepository(ApplicationDbContext dbContext) : IBasicInfoRepository<ProductionMaterial>
{
    public async Task<List<ProductionMaterial>> GetAllAsync()
    {
        return await dbContext.ProductionMaterials.ToListAsync();
    }

    public async Task<ProductionMaterial?> GetByIdAsync(int id)
    {
        return await dbContext.ProductionMaterials.FindAsync(id);
    }

    public async Task<ProductionMaterial> CreateAsync(CreateBasicInfoDto createBasicInfoDto)
    {
        var productionMaterial = createBasicInfoDto.ToProductionMaterialFromCreateDto();

        await dbContext.ProductionMaterials.AddAsync(productionMaterial);
        await dbContext.SaveChangesAsync();
        return productionMaterial;
    }

    public async Task UpdateAsync(int id, UpdateBasicInfoDto updateBasicInfoDto)
    {
        var productionMaterial = (await GetByIdAsync(id))!;
        if (updateBasicInfoDto.Name is not null)
        {
            productionMaterial.Name = updateBasicInfoDto.Name;
            await dbContext.SaveChangesAsync();
        }
    }

    public async Task DeleteAsync(int id)
    {
        var productionMaterial = (await GetByIdAsync(id))!;

        dbContext.ProductionMaterials.Remove(productionMaterial);

        await dbContext.SaveChangesAsync();
    }
}