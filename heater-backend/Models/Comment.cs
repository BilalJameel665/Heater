using System.ComponentModel.DataAnnotations;

namespace heater_backend.Models
{
	public class Comment : Post
	{
		[Required]
		public required Post ParentPost { get; set; }
	}
}