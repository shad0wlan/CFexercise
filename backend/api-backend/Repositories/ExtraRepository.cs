using Microsoft.EntityFrameworkCore;
using Plastiki.Dtos.BasicInfo;
using Plastiki.Interfaces;
using Plastiki.Mappers;
using Plastiki.Models;
using Plastiki.Properties.Database;

namespace Plastiki.Service;

public class ExtraRepository(ApplicationDbContext dbContext) : IBasicInfoRepository<Extra>
{
    public async Task<List<Extra>> GetAllAsync()
    {
        return await dbContext.Extras.ToListAsync();
    }

    public async Task<Extra?> GetByIdAsync(int id)
    {
        return await dbContext.Extras.FindAsync(id);
    }

    public async Task<Extra> CreateAsync(CreateBasicInfoDto createBasicInfoDto)
    {
        var extra = createBasicInfoDto.ToExtraFromCreateDto();

        await dbContext.Extras.AddAsync(extra);
        await dbContext.SaveChangesAsync();
        return extra;
    }

    public async Task UpdateAsync(int id, UpdateBasicInfoDto updateBasicInfoDto)
    {
        var extra = (await GetByIdAsync(id))!;
        if (updateBasicInfoDto.Name is not null)
        {
            extra.Name = updateBasicInfoDto.Name;
            await dbContext.SaveChangesAsync();
        }
    }

    public async Task DeleteAsync(int id)
    {
        var extra = (await GetByIdAsync(id))!;

        dbContext.Extras.Remove(extra);

        await dbContext.SaveChangesAsync();
    }
}