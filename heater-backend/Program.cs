using heater_backend.Data;
using heater_backend.Services;
using heater_backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

//jwt authentication stuff
var builder = WebApplication.CreateBuilder(args);
var jwtKey = builder.Configuration["Jwt:Key"];
var jwtIssuer = builder.Configuration["Jwt:Issuer"];

builder.Services.AddAuthentication(options =>
{
	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidateLifetime = true,
		ValidateIssuerSigningKey = true,
		ValidIssuer = jwtIssuer,
		ValidAudience = jwtIssuer,
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
	};
});

builder.Services.AddDbContext<HeaterDbContext>(options =>
	options.UseNpgsql(builder.Configuration["ConnectionStrings:DefaultConnection"])
);

builder.Services.AddScoped<PostService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddAuthorization();

var app = builder.Build();
//enabling jwt
app.UseAuthentication();
app.UseAuthorization();

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

//this is the route for authorization  
app.MapGet("/api/users/me", (HttpContext http, UserService userService) =>
{
	var userId = http.User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
	return Results.Ok(new { userId });
})
.RequireAuthorization();


//This route is for Creating user
app.MapPost("/api/users", async (User user, UserService userService) =>
{
	try
	{
		var newUser = await userService.CreateUserAsync(user);
		Console.WriteLine(newUser.Username);
		return Results.Created($"/api/users/{newUser.Id}", newUser);
		
	}
	catch (Exception ex)
	{
		Console.WriteLine(ex.Message);
		return Results.Problem("An error occurred while creating the user.");
	}
});

//This is the route for updating user values
app.MapPut("/api/users/{id}", async (Guid id, User user, UserService userService) =>
{
	try
	{
		var existingUser = await userService.GetUserAsync(id);
		if (existingUser == null)
		{
			return Results.NotFound($"User with ID {id} not found.");
		}
		user.Id = id;

		var updatedUser = await userService.UpdateUserAsync(user);
		return Results.Ok(updatedUser);
	}
	catch (Exception ex)
	{
		Console.WriteLine(ex.Message);
		return Results.Problem("An error occurred while updating the user.");
	}
});
//This route is to retrieve the user
app.MapGet("/api/users/{id}", async (Guid id, UserService userService) =>
{
	try
	{
		var user = await userService.GetUserAsync(id);
		if (user == null)
		{
			return Results.NotFound($"User with ID {id} not found.");
		}

		return Results.Ok(user);
	}
	catch (Exception ex)
	{
		Console.WriteLine(ex.Message);
		return Results.Problem("An error occurred while retrieving the user.");
	}
});

// This is the route to delete the user
app.MapDelete("/api/users/{id}", async (Guid id, UserService userService) =>
{
	var existingUser = await userService.GetUserAsync(id);
	if (existingUser == null)
	{
		return Results.NotFound($"User with ID {id} not found.");
	}

	await userService.DeleteUserAsync(existingUser);
	return Results.NoContent();
});

// this is the route to authenticate/login a user 
app.MapPost("/api/auth/login", async (User user, UserService userService, IConfiguration config) =>
{
	var loginUser = await userService.AuthenticateUserAsyncLogin(user.Email, user.Password);
	if (loginUser == null)
		return Results.Unauthorized();

	var token = JwtTokenGen.JwtTokenGenerator(loginUser, config);
	return Results.Ok(new { token });
});

app.MapGet("/api/posts/{id}", async (string id, PostService postService) =>
{
	try
	{
		var post = await postService.GetPostAsync(id);
		if (post == null)
		{
			return Results.NotFound(new { error = $"Post with {id} doesn't exist" });
		}

		return Results.Ok(post);
	}
	catch
	{
		return Results.BadRequest(new { error = "Could not get post" });
	}
});

app.MapPost("/api/posts/", async (Post post, PostService postService) =>
{
	try
	{
		await postService.CreatePostAsync(post);
		return Results.Created($"/api/posts/{post.Id}", post);
	}
	catch
	{
		return Results.BadRequest(new { error = "Could not create post" });
	}

});

app.MapPut("/api/posts/{id}", async (string id, Post post, PostService postService) =>
{

	try
	{
		if (await postService.GetPostAsync(id) == null)
		{
			return Results.BadRequest(new { error = "Post doesn't exist" });
		}

		var p = await postService.UpdatePostAsync(post);
		return Results.Ok(p);
	}
	catch
	{
		return Results.BadRequest(new { error = "Could not update the post" });
	}
});



app.MapDelete("/api/posts/{id}", async (string id, PostService postService) =>
{
	try
	{
		var post = await postService.GetPostAsync(id);

		if (post == null)
		{
			return Results.NotFound(new { error = $"Post with {id} doesn't exist" });
		}
		await postService.DeletePostAsync(post);
		return Results.NoContent();
	}
	catch
	{
		return Results.BadRequest();
	}

});

app.MapFallback((context) =>
{
	context.Response.ContentType = "text/html";
	return context.Response.SendFileAsync(Path.Combine(frontendPath, "index.html"));
});

app.Run();
