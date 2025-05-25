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
		public Metrics Metrics { get; set; } = new Metrics();

		public ICollection<Comment> Comments { get; set; } = [];
	}


	[Owned]
	class Metrics
	{
		[Required]
		public int Likes { get; set; } = 0;
		[Required]
		public int CommentCount { get; set; } = 0;
		[Required]
		public int Repost { get; set; } = 0;
		[Required]
		public int Views { get; set; } = 0;
		[Required]
		public int Dislikes { get; set; } = 0;
	}
}