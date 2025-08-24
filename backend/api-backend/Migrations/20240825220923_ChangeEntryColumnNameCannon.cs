using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Plastiki.Migrations
{
    /// <inheritdoc />
    public partial class ChangeEntryColumnNameCannon : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CanonTemp",
                table: "Entries",
                newName: "CannonTemp");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CannonTemp",
                table: "Entries",
                newName: "CanonTemp");
        }
    }
}
