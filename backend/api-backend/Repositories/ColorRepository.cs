using Microsoft.EntityFrameworkCore;
using Plastiki.Dtos.BasicInfo;
using Plastiki.Interfaces;
using Plastiki.Mappers;
using Plastiki.Models;
using Plastiki.Properties.Database;

namespace Plastiki.Service;

public class ColorRepository(ApplicationDbContext dbContext) : IBasicInfoRepository<Color>
{
    public async Task<List<Color>> GetAllAsync()
    {
        return await dbContext.Colors.ToListAsync();
    }

    public async Task<Color?> GetByIdAsync(int id)
    {
        return await dbContext.Colors.FindAsync(id);
    }

    public async Task<Color> CreateAsync(CreateBasicInfoDto createBasicInfoDto)
    {
        var color = createBasicInfoDto.ToColorFromCreateDto();

        await dbContext.Colors.AddAsync(color);
        await dbContext.SaveChangesAsync();
        return color;
    }

    public async Task UpdateAsync(int id, UpdateBasicInfoDto updateBasicInfoDto)
    {
        var color = (await GetByIdAsync(id))!;
        if (updateBasicInfoDto.Name is not null)
        {
            color.Name = updateBasicInfoDto.Name;
            await dbContext.SaveChangesAsync();
        }
    }

    public async Task DeleteAsync(int id)
    {
        var color = (await GetByIdAsync(id))!;

        dbContext.Colors.Remove(color);

        await dbContext.SaveChangesAsync();
    }
}