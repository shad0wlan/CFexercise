using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Plastiki.Migrations
{
    /// <inheritdoc />
    public partial class AddProductCodes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductCode",
                table: "Entries");

            migrationBuilder.AddColumn<int>(
                name: "ProductCodeId",
                table: "Entries",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ProductCode",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    Code = table.Column<string>(type: "text", nullable: false),
                    CannonTemp = table.Column<double>(type: "double precision", nullable: true),
                    Speed = table.Column<double>(type: "double precision", nullable: true),
                    ScrewsPerZoneJson = table.Column<string>(type: "text", nullable: true),
                    KalupiTempJson = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductCode", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Entries_ProductCodeId",
                table: "Entries",
                column: "ProductCodeId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductCode_Code",
                table: "ProductCode",
                column: "Code",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_ProductCode_ProductCodeId",
                table: "Entries",
                column: "ProductCodeId",
                principalTable: "ProductCode",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entries_ProductCode_ProductCodeId",
                table: "Entries");

            migrationBuilder.DropTable(
                name: "ProductCode");

            migrationBuilder.DropIndex(
                name: "IX_Entries_ProductCodeId",
                table: "Entries");

            migrationBuilder.DropColumn(
                name: "ProductCodeId",
                table: "Entries");

            migrationBuilder.AddColumn<string>(
                name: "ProductCode",
                table: "Entries",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
