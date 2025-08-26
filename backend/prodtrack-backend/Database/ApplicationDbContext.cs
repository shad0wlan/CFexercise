using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Plastiki.Models;

namespace Plastiki.Properties.Database;

public sealed class ApplicationDbContext : IdentityDbContext<User>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Machine> Machines { get; set; }

    public DbSet<ProductCode> ProductCodes { get; set; }
    public DbSet<ProductionMaterial> ProductionMaterials { get; set; }

    public DbSet<Entry> Entries { get; set; }
    public DbSet<PackageType> PackageTypes { get; set; }
    public DbSet<Color> Colors { get; set; }

    public DbSet<Extra> Extras { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Entry>()
            .Property(e => e.ScrewsPerZoneJson)
            .HasColumnType("jsonb");

        modelBuilder.Entity<Entry>()
            .Property(e => e.KalupiTempJson)
            .HasColumnType("jsonb");

        modelBuilder.Entity<Entry>()
            .HasOne(e => e.Machine)
            .WithMany(e => e.Entries)
            .HasForeignKey(e => e.MachineId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Entry>()
            .HasOne(e => e.User)
            .WithMany(e => e.Entries)
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Entry>()
            .HasOne(e => e.PackageType)
            .WithMany(e => e.Entries)
            .HasForeignKey(e => e.PackageTypeId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Entry>()
            .HasOne(e => e.ProductionMaterial)
            .WithMany(e => e.Entries)
            .HasForeignKey(e => e.ProductionMaterialId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Entry>()
            .HasOne(e => e.Color)
            .WithMany(e => e.Entries)
            .HasForeignKey(e => e.ColorId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Entry>()
            .HasOne(e => e.ProductCode)
            .WithMany(e => e.Entries)
            .HasForeignKey(e => e.ProductCodeId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Entry>()
            .HasOne(e => e.Extra)
            .WithMany(e => e.Entries)
            .HasForeignKey(e => e.ExtraId)
            .OnDelete(DeleteBehavior.SetNull);

        base.OnModelCreating(modelBuilder);
    }
}