
using heater_backend.Data;
using heater_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace heater_backend.Services
{
	class PostService(HeaterDbContext _db)
	{
		public async Task<Post?> GetPostAsync(String postId)
		{
			return await _db.Posts.FindAsync(postId);
		}

		public async Task<ICollection<Post>> GetUserPostsAsync(Guid userId)
		{
			return await _db.Posts.Where(post => post.Author.Id == userId).ToListAsync();
		}

		public async Task<Post> CreatePostAsync(Post post)
		{
			post.Id = await GeneratePostId();
			await _db.Posts.AddAsync(post);
			await _db.SaveChangesAsync();

			return post;
		}



		public async Task DeletePostAsync(Post post)
		{
			_db.Posts.Remove(post);
			await _db.SaveChangesAsync();
		}

		public async Task<Post> UpdatePostAsync(Post post)
		{
			_db.Posts.Update(post);
			await _db.SaveChangesAsync();
			return post;
		}


		private async Task<string> GeneratePostId()
		{
			String id;
			do
			{
				id = Convert.ToBase64String(Guid.NewGuid().ToByteArray())
					.TrimEnd('=')
					.Replace('+', '-')
					.Replace('/', '_');
			} while (await _db.Posts.AnyAsync(post => post.Id == id));
			return id;
		}
	}
}