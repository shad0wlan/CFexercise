using Plastiki.Dtos.Entry;
using Plastiki.Models;

namespace Plastiki.Interfaces;

public interface IEntryRepository
{
    Task<List<Entry>> GetAllAsync(string userId, string userRole, string status);
    Task<Entry?> GetByIdAsync(int id);
    Task<Entry> CreateAsync(CreateEntryDto createEntryDto, string userId);
    Task UpdateAsync(UpdateEntryDto updateEntryDto, int id);
    Task DeleteAsync(int id);
}