using System.ComponentModel.DataAnnotations;

namespace Plastiki.Dtos.BasicInfo;

public record CreateBasicInfoDto
{
    [Required] public string Name { get; init; }
}