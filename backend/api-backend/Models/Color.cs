using Microsoft.EntityFrameworkCore;

namespace Plastiki.Models;

[Index(nameof(Name), IsUnique = true)]
public class Color
{
    public int Id { get; set; }
    public string Name { get; set; }

    public virtual ICollection<Entry> Entries { get; set; } = new List<Entry>();
}