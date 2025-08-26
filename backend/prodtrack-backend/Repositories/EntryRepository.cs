using Microsoft.EntityFrameworkCore;
using Plastiki.Dtos.Entry;
using Plastiki.Enums;
using Plastiki.Interfaces;
using Plastiki.Mappers;
using Plastiki.Models;
using Plastiki.Properties.Database;

namespace Plastiki.Service;

public class EntryRepository(ApplicationDbContext dbContext) : IEntryRepository
{
    public async Task<List<Entry>> GetAllAsync(string userId, string userRole, string status)
    {
        var query = dbContext.Entries.Include(e => e.User)
            .Include(e => e.Machine)
            .Include(e => e.Color)
            .Include(e => e.ProductCode)
            .Include(e => e.PackageType)
            .Include(e => e.ProductionMaterial)
            .Include(e => e.Extra)
            .OrderByDescending(e => e.UpdatedAt.HasValue)
            .ThenByDescending(e => e.UpdatedAt);

        if (!Enum.TryParse<EntryStatus>(status, true, out var statusEnum))
        {
            // Return Worker entries
            if (userRole.Equals(Roles.Worker.ToString(), StringComparison.OrdinalIgnoreCase))
            {
                return await query.Where(e => e.UserId == userId).ToListAsync();
            }

            // Return all entries
            return await query.ToListAsync();
        }

        // Return Worker entries
        if (userRole.Equals(Roles.Worker.ToString(), StringComparison.OrdinalIgnoreCase))
        {
            return await query
                .Where(e => e.UserId == userId)
                .Where(e => e.Status == statusEnum)
                .ToListAsync();
        }

        // Return all entries
        return await query
            .Where(e => e.Status == statusEnum)
            .ToListAsync();
    }

    public async Task<Entry?> GetByIdAsync(int id)
    {
        return await dbContext.Entries.Include(e => e.User)
            .Include(e => e.Machine)
            .Include(e => e.Color)
            .Include(e => e.PackageType)
            .Include(e => e.ProductCode)
            .Include(e => e.ProductionMaterial)
            .Include(e => e.Extra)
            .FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<Entry> CreateAsync(CreateEntryDto createEntryDto, string userId)
    {
        var entry = createEntryDto.ToEntryFromCreateDto(userId);

        await dbContext.Entries.AddAsync(entry);
        await dbContext.SaveChangesAsync();
        return (await GetByIdAsync(entry.Id))!;
    }

    public async Task UpdateAsync(UpdateEntryDto updateEntryDto, int id)
    {
        var entry = (await GetByIdAsync(id))!;

        var entryProperties = typeof(Entry).GetProperties();
        var dtoProperties = typeof(UpdateEntryDto).GetProperties();

        foreach (var dtoProperty in dtoProperties)
        {
            var entryProperty =
                entryProperties.FirstOrDefault(p =>
                    p.Name.Equals(dtoProperty.Name, StringComparison.OrdinalIgnoreCase));
            if (entryProperty is null) continue;

            var value = dtoProperty.GetValue(updateEntryDto);
            if (value is not null)
            {
                entryProperty.SetValue(entry, value);
            }
        }

        entry.UpdatedAt = DateTime.Now.ToUniversalTime();

        await dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entry = (await GetByIdAsync(id))!;
        dbContext.Entries.Remove(entry);
        await dbContext.SaveChangesAsync();
    }
}