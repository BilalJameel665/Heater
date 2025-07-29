using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;


namespace heater_backend.Models
{
	public class Post
	{
		[Key]
		[Required]
		public string Id { get; set; } = null!;

		[Required]
		[MaxLength(500)]
		public string Text { get; set; } = string.Empty;

		[Required]
		public required User Author { get; set; }

		[Required]
		public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

		[Required]
		public Metrics Metrics { get; set; } = new Metrics();

		public string? ParentId { get; set; } = null;
	}


	[Owned]
	public class Metrics
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

