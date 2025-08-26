using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Plastiki.Migrations
{
    /// <inheritdoc />
    public partial class AddImageToMachine : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0228f3ca-7c5e-4783-befa-732becc40a37");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "08afbcd6-bd4c-4ae9-a422-25b5bd542d33");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f4d929d9-eda5-4b8c-9103-58b2f8d8aea5");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Machines",
                type: "text",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8df4ff60-6675-4b2b-a42d-33d5b9305ce8", null, "Admin", "ADMIN" },
                    { "d31c769a-e2d4-4ce2-90b6-630b482ead6c", null, "Worker", "WORKER" },
                    { "edd899c8-9ec2-47d9-8b75-edc0b5818d5d", null, "Operator", "OPERATOR" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8df4ff60-6675-4b2b-a42d-33d5b9305ce8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d31c769a-e2d4-4ce2-90b6-630b482ead6c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "edd899c8-9ec2-47d9-8b75-edc0b5818d5d");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Machines");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0228f3ca-7c5e-4783-befa-732becc40a37", null, "Admin", "ADMIN" },
                    { "08afbcd6-bd4c-4ae9-a422-25b5bd542d33", null, "Worker", "WORKER" },
                    { "f4d929d9-eda5-4b8c-9103-58b2f8d8aea5", null, "Operator", "OPERATOR" }
                });
        }
    }
}
