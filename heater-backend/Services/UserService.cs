using heater_backend.Data;
using heater_backend.Data.Models;
using heater_backend.Models;

namespace heater_backend.Services;

public class UserService(HeaterDbContext _db)
{
    public async Task<User> CreateUserAsync(User user)
    {
        await _db.AddAsync(user);
        await _db.SaveChangesAsync();
        return user;
    }
    public async Task<User?> UpdateUserEmailAsync(Guid userId, string email)
    {
        var user = await _db.Users.FindAsync(userId);
        if (user is null) return null;

        user.Email = email;
        await _db.SaveChangesAsync();
        return user;
    }

}