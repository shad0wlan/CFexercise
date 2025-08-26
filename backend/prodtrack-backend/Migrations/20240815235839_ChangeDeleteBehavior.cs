using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Plastiki.Migrations
{
    /// <inheritdoc />
    public partial class ChangeDeleteBehavior : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entries_AspNetUsers_UserId",
                table: "Entries");

            migrationBuilder.DropForeignKey(
                name: "FK_Entries_Extras_ExtraId",
                table: "Entries");

            migrationBuilder.DropForeignKey(
                name: "FK_Entries_Machines_MachineId",
                table: "Entries");

            migrationBuilder.DropForeignKey(
                name: "FK_Entries_PackageTypes_PackageTypeId",
                table: "Entries");

            migrationBuilder.DropForeignKey(
                name: "FK_Entries_ProductionMaterials_ProductionMaterialId",
                table: "Entries");

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_AspNetUsers_UserId",
                table: "Entries",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_Extras_ExtraId",
                table: "Entries",
                column: "ExtraId",
                principalTable: "Extras",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_Machines_MachineId",
                table: "Entries",
                column: "MachineId",
                principalTable: "Machines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_PackageTypes_PackageTypeId",
                table: "Entries",
                column: "PackageTypeId",
                principalTable: "PackageTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_ProductionMaterials_ProductionMaterialId",
                table: "Entries",
                column: "ProductionMaterialId",
                principalTable: "ProductionMaterials",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entries_AspNetUsers_UserId",
                table: "Entries");

            migrationBuilder.DropForeignKey(
                name: "FK_Entries_Extras_ExtraId",
                table: "Entries");

            migrationBuilder.DropForeignKey(
                name: "FK_Entries_Machines_MachineId",
                table: "Entries");

            migrationBuilder.DropForeignKey(
                name: "FK_Entries_PackageTypes_PackageTypeId",
                table: "Entries");

            migrationBuilder.DropForeignKey(
                name: "FK_Entries_ProductionMaterials_ProductionMaterialId",
                table: "Entries");

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_AspNetUsers_UserId",
                table: "Entries",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_Extras_ExtraId",
                table: "Entries",
                column: "ExtraId",
                principalTable: "Extras",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_Machines_MachineId",
                table: "Entries",
                column: "MachineId",
                principalTable: "Machines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_PackageTypes_PackageTypeId",
                table: "Entries",
                column: "PackageTypeId",
                principalTable: "PackageTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_ProductionMaterials_ProductionMaterialId",
                table: "Entries",
                column: "ProductionMaterialId",
                principalTable: "ProductionMaterials",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
