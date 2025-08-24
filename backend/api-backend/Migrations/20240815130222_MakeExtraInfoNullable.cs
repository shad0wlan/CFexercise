using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Plastiki.Migrations
{
    /// <inheritdoc />
    public partial class MakeExtraInfoNullable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entries_Extras_ExtraId",
                table: "Entries");

            migrationBuilder.AlterColumn<int>(
                name: "ExtraId",
                table: "Entries",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_Extras_ExtraId",
                table: "Entries",
                column: "ExtraId",
                principalTable: "Extras",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entries_Extras_ExtraId",
                table: "Entries");

            migrationBuilder.AlterColumn<int>(
                name: "ExtraId",
                table: "Entries",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_Extras_ExtraId",
                table: "Entries",
                column: "ExtraId",
                principalTable: "Extras",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
