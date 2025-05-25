
using System.ComponentModel.DataAnnotations;

namespace heater_backend.Models
{
	class Post
	{
		[Key]
		public Guid Id { get; set; }

		[MaxLength(500)]
		public required string Text { get; set; }

		public required User Author { get; set; }

		public ICollection<Comment> Comments { get; set; } = [];
	}
}