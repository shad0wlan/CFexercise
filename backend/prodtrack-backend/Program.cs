using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Plastiki.Filters.ColorFilter;
using Plastiki.Filters.EntryFilter;
using Plastiki.Filters.ExtraFilter;
using Plastiki.Filters.PackageType;
using Plastiki.Filters.ProductCodeFilter;
using Plastiki.Filters.UserFilter;
using Plastiki.Interfaces;
using Plastiki.Models;
using Plastiki.Properties.Database;
using Plastiki.Service;
using Plastiki.Utils;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        if (builder.Environment.IsDevelopment())
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        }
    });
});

builder.Services.AddControllers();
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
});

builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseNpgsql(builder.Configuration.GetConnectionString("Database")));
builder.Services.AddIdentity<User, IdentityRole>(options =>
    {
        options.Password.RequiredLength = 8;
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireNonAlphanumeric = false;
    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme =
        options.DefaultChallengeScheme =
            options.DefaultForbidScheme =
                options.DefaultScheme =
                    options.DefaultSignInScheme =
                        options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = builder.Configuration["JWT:Audience"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"]!))
    };
});


builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IEntryRepository, EntryRepository>();
builder.Services.AddScoped<IMachineRepository, MachineRepository>();
builder.Services.AddScoped<IProductCodeRepository, ProductCodeRepository>();
builder.Services.AddScoped<IBasicInfoRepository<ProductionMaterial>, ProductionMaterialRepository>();
builder.Services.AddScoped<IBasicInfoRepository<PackageType>, PackageTypeRepository>();
builder.Services.AddScoped<IBasicInfoRepository<Color>, ColorRepository>();
builder.Services.AddScoped<IBasicInfoRepository<Extra>, ExtraRepository>();
builder.Services.AddScoped<UserValidateIdFilterAttribute>();
builder.Services.AddScoped<MachineValidateIdFilterAttribute>();
builder.Services.AddScoped<ProductionMaterialValidateIdFilterAttribute>();
builder.Services.AddScoped<PackageTypeValidateIdFilterAttribute>();
builder.Services.AddScoped<ColorValidateIdFilterAttribute>();
builder.Services.AddScoped<ExtraValidateIdFilterAttribute>();
builder.Services.AddScoped<EntryValidateIdFilterAttribute>();
builder.Services.AddScoped<EntryValidateForeignKeysFilterAttribute>();
builder.Services.AddScoped<EntryValidateRoleFilterAttribute>();
builder.Services.AddScoped<ProductCodeValidateIdFilterAttribute>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Create Uploads folder if it doesn't exist (for dev environment)
if (app.Environment.IsDevelopment())
{
    var uploadsPath = Path.Combine(builder.Environment.ContentRootPath, "Uploads");
    if (!Directory.Exists(uploadsPath))
    {
        Directory.CreateDirectory(uploadsPath);
    }
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "Uploads")),
    RequestPath = "/Images"
});

app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
    app.UseCors("AllowAll");
}

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    await RolesUtils.SeedRolesAsync(services);
    await RolesUtils.SeedDefaultAdminAsync(services);
    await RolesUtils.SeedDefaultUsersAsync(services);
}

app.Run();

// TODO: Add more advanced features to entries (backend pagination search and sorting)
// TODO: Fix double default 0 value in db