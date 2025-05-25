using Microsoft.EntityFrameworkCore;
using heater_backend.Models;

namespace heater_backend.Data
{
	public class HeaterDbContext : DbContext
	{
		public HeaterDbContext(DbContextOptions<HeaterDbContext> options) : base(options) { }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Post>(entity =>
			{
				entity.OwnsOne(p => p.Metrics);
			});
		}
	}
}