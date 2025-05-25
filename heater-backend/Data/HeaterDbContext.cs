using Microsoft.EntityFrameworkCore;
using heater_backend.Models;

namespace heater_backend.Data
{
	public class HeaterDbContext : DbContext
	{
		public HeaterDbContext(DbContextOptions<HeaterDbContext> options) : base(options) { }

		public DbSet<User> Users { get; set; }
		public DbSet<Post> Posts { get; set; }
		public DbSet<Comment> Comments { get; set; }


		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Post>(entity =>
			{
				entity.OwnsOne(p => p.Metrics);
			});
		}
	}
}