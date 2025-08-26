using Plastiki.Dtos.BasicInfo;

namespace Plastiki.Interfaces;

public interface IBasicInfoRepository<T>
{
    public Task<List<T>> GetAllAsync();

    public Task<T?> GetByIdAsync(int id);
    public Task<T> CreateAsync(CreateBasicInfoDto createBasicInfoDto);

    public Task UpdateAsync(int id, UpdateBasicInfoDto updateBasicInfoDto);

    public Task DeleteAsync(int id);
}