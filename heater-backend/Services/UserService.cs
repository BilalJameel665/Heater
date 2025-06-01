using heater_backend.Data;
using heater_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace heater_backend.Services;

public class UserService(HeaterDbContext _db)
{
    public async Task<User> CreateUserAsync(User user)
    {
        await _db.AddAsync(user);
        await _db.SaveChangesAsync();
        return user;
    }
    public async Task<User> UpdateUserAsync(User user)
    {
        _db.Users.Update(user);
        await _db.SaveChangesAsync();
        return user;
    }
    public async Task DeleteUserAsync(User user)
    {
        _db.Users.Remove(user);
        await _db.SaveChangesAsync();
    }
    public async Task<User?> GetUserAsync(Guid id)
    {
        return await _db.Users.FirstOrDefaultAsync(user => user.Id == id);
    }
}