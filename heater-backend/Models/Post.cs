using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace heater_backend.Models
{
	class Post
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Key]
		public Guid Id { get; set; }

		[Required]
		[MaxLength(500)]
		public string Text { get; set; } = string.Empty;

		[Required]
		public User Author { get; set; }
		[Required]
		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		[Required]
		public required Metrics Metrics { get; set; }

		public ICollection<Comment> Comments { get; set; } = [];

	}
}