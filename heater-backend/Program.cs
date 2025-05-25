using heater_backend.Data;
using heater_backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddDbContext<HeaterDbContext>(options =>
	options.UseNpgsql(builder.Configuration["ConnectionStrings:DefaultConnection"])
);

builder.Services.AddScoped<UserService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();


app.MapPost("/api/users", async (UserService service, User user) =>
{
    var created = await service.CreateUserAsync(user);
    return Results.Created($"/api/users/{created.Id}", created);
});

app.MapPut("/api/users/{id:guid}/email", async (UserService service, Guid id, string email) =>
{
    var updated = await service.UpdateUserEmailAsync(id, email);
    return updated is not null ? Results.Ok(updated) : Results.NotFound();
});


app.MapGet("/weatherforecast", () =>
{

});

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
