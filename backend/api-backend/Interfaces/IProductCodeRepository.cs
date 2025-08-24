using Microsoft.AspNetCore.Mvc;
using Plastiki.Dtos.Machine;
using Plastiki.Dtos.ProductCode;
using Plastiki.Models;

namespace Plastiki.Interfaces;

public interface IProductCodeRepository
{
    Task<List<ProductCode>> GetAllAsync();
    Task<ProductCode?> GetByIdAsync(int id);
    Task<ProductCode> CreateAsync(CreateProductCodeDto createProductCodeDto);
    Task UpdateAsync(UpdateProductCodeDto updateProductCodeDto, int id);
    Task DeleteAsync(int id);
}