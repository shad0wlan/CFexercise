using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Plastiki.Migrations
{
    /// <inheritdoc />
    public partial class ChangeProductCodesTableName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entries_ProductCode_ProductCodeId",
                table: "Entries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductCode",
                table: "ProductCode");

            migrationBuilder.RenameTable(
                name: "ProductCode",
                newName: "ProductCodes");

            migrationBuilder.RenameIndex(
                name: "IX_ProductCode_Code",
                table: "ProductCodes",
                newName: "IX_ProductCodes_Code");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductCodes",
                table: "ProductCodes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_ProductCodes_ProductCodeId",
                table: "Entries",
                column: "ProductCodeId",
                principalTable: "ProductCodes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entries_ProductCodes_ProductCodeId",
                table: "Entries");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductCodes",
                table: "ProductCodes");

            migrationBuilder.RenameTable(
                name: "ProductCodes",
                newName: "ProductCode");

            migrationBuilder.RenameIndex(
                name: "IX_ProductCodes_Code",
                table: "ProductCode",
                newName: "IX_ProductCode_Code");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductCode",
                table: "ProductCode",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_ProductCode_ProductCodeId",
                table: "Entries",
                column: "ProductCodeId",
                principalTable: "ProductCode",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
