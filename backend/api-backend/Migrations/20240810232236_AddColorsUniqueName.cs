using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Plastiki.Migrations
{
    /// <inheritdoc />
    public partial class AddColorsUniqueName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Colors_Name",
                table: "Colors",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Colors_Name",
                table: "Colors");
        }
    }
}
