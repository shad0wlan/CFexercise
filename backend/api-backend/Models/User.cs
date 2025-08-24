using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Plastiki.Models;

[Index(nameof(Email), IsUnique = true)]
public class User : IdentityUser
{
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public virtual ICollection<Entry> Entries { get; set; } = new List<Entry>();
}