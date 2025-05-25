using Microsoft.EntityFrameworkCore;

namespace heater_backend.Data
{
	public class HeaterDbContext : DbContext
	{
		public HeaterDbContext(DbContextOptions<HeaterDbContext> options) : base(options) { }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
		}
	}
}