using Microsoft.EntityFrameworkCore;

namespace Plastiki.Models;

[Index(nameof(Name), IsUnique = true)]
public class Machine
{
    public int Id { get; set; }
    public string Name { get; set; }

    public string? Image { get; set; }

    public DateTime CreatedAt { get; init; } = DateTime.Now.ToUniversalTime();

    public virtual ICollection<Entry> Entries { get; set; } = new List<Entry>();
}