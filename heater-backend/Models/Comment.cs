using System.ComponentModel.DataAnnotations;

namespace heater_backend.Models
{
	class Comment : Post
	{
		[Required]
		public required Post ParentPost { get; set; }
	}
}