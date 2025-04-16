using FinalExam.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Connect to the database using the connection string
builder.Services.AddDbContext<EntertainmentAgencyExampleContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("EntertainerConnection"));
});

builder.Services.AddCors(options => {
    options.AddPolicy("allowReactApp",
    policy =>
    {
        policy.WithOrigins("http://localhost:7000")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("allowReactApp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
