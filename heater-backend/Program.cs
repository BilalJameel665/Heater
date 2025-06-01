using heater_backend.Data;
using heater_backend.Services;
using heater_backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddDbContext<HeaterDbContext>(options =>
	options.UseNpgsql(builder.Configuration["ConnectionStrings:DefaultConnection"])
);

builder.Services.AddScoped<PostService>();
builder.Services.AddScoped<UserService>();


var app = builder.Build();

if (app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.MapOpenApi();   // Expose OpenAPI docs only in Development
}


var frontendPath = Path.Combine(Directory.GetCurrentDirectory(), "..", "heater-frontend", "dist");


app.UseStaticFiles(new StaticFileOptions
{
	FileProvider = new PhysicalFileProvider(frontendPath),
	RequestPath = ""
});



app.MapPost("/api/posts/", async (Post post, PostService postService) =>
{
	await postService.CreatePostAsync(post);

});

app.MapPut("/api/posts/{id}", async (string id, Post post, PostService postService) =>
{

	if (await postService.GetPostAsync(id) == null)
	{
		return Results.BadRequest("Post doesnt exist");
	}

	var p = await postService.UpdatePostAsync(post);

	return Results.Ok(p);
});

app.MapGet("/api/posts/{id}", async (string id, PostService postService) =>
{

	var post = await postService.GetPostAsync(id);

	return Results.Ok(post);
});

app.MapDelete("/api/posts/{id}", async (string id, PostService postService) =>
{
	var post = await postService.GetPostAsync(id);

	if (post == null)
	{
		return Results.BadRequest("Post doesn't exist");
	}

	await postService.DeletePostAsync(post);

	return Results.StatusCode(204);
});

app.MapFallback((context) =>
{
	context.Response.ContentType = "text/html";
	return context.Response.SendFileAsync(Path.Combine(frontendPath, "index.html"));
});

app.Run();
