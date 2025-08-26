using Plastiki.Dtos.Machine;
using Plastiki.Models;

namespace Plastiki.Interfaces;

public interface IMachineRepository
{
    Task<List<Machine>> GetAllAsync();
    Task<Machine?> GetByIdAsync(int id);
    Task<Machine> CreateAsync(Machine machine);

    Task UpdateAsync(int id, Machine updateMachine);
    Task<Machine> DeleteAsync(int id);
}