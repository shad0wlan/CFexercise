using Microsoft.EntityFrameworkCore;
using Plastiki.Interfaces;
using Plastiki.Models;
using Plastiki.Properties.Database;

namespace Plastiki.Service;

public class MachineRepository(ApplicationDbContext dbContext) : IMachineRepository
{
    public async Task<List<Machine>> GetAllAsync()
    {
        return await dbContext.Machines.ToListAsync();
    }

    public async Task<Machine?> GetByIdAsync(int id)
    {
        return await dbContext.Machines.FindAsync(id);
    }

    public async Task<Machine> CreateAsync(Machine machine)
    {
        await dbContext.AddAsync(machine);
        await dbContext.SaveChangesAsync();
        return machine;
    }

    public async Task UpdateAsync(int id, Machine updateMachine)
    {
        var machine = (await GetByIdAsync(id))!;
        machine.Name = updateMachine.Name;
        if (updateMachine.Image is not null)
        {
            machine.Image = updateMachine.Image;
        }

        await dbContext.SaveChangesAsync();
    }

    public async Task<Machine> DeleteAsync(int id)
    {
        var machine = await GetByIdAsync(id);
        dbContext.Machines.Remove(machine!);
        await dbContext.SaveChangesAsync();
        return machine!;
    }
}