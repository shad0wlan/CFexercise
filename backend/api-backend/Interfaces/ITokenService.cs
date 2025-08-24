using Plastiki.Models;

namespace Plastiki.Interfaces;

public interface ITokenService
{
    Task<string> CreateToken(User user);
}