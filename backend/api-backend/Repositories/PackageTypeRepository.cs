using Microsoft.EntityFrameworkCore;
using Plastiki.Dtos.BasicInfo;
using Plastiki.Interfaces;
using Plastiki.Mappers;
using Plastiki.Models;
using Plastiki.Properties.Database;

namespace Plastiki.Service;

public class PackageTypeRepository(ApplicationDbContext dbContext) : IBasicInfoRepository<PackageType>
{
    public async Task<List<PackageType>> GetAllAsync()
    {
        return await dbContext.PackageTypes.ToListAsync();
    }

    public async Task<PackageType?> GetByIdAsync(int id)
    {
        return await dbContext.PackageTypes.FindAsync(id);
    }

    public async Task<PackageType> CreateAsync(CreateBasicInfoDto createBasicInfoDto)
    {
        var packageType = createBasicInfoDto.ToPackageTypeFromCreateDto();

        await dbContext.PackageTypes.AddAsync(packageType);
        await dbContext.SaveChangesAsync();
        return packageType;
    }

    public async Task UpdateAsync(int id, UpdateBasicInfoDto updateBasicInfoDto)
    {
        var packageType = (await GetByIdAsync(id))!;
        if (updateBasicInfoDto.Name is not null)
        {
            packageType.Name = updateBasicInfoDto.Name;
            await dbContext.SaveChangesAsync();
        }
    }

    public async Task DeleteAsync(int id)
    {
        var packageType = (await GetByIdAsync(id))!;

        dbContext.PackageTypes.Remove(packageType);

        await dbContext.SaveChangesAsync();
    }
}