import Post from "../components/Post";
import styles from "./Home.module.css"

export default function Home() {
	const post : Post = {
		id: 0,
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		author: "Tommy Chabiras",
		metrics: {likeCount: 500, dislikeCount: 1000, viewCount: 200000, repostCount: 20, commentCount: 3}
	}

	const posts: Post[] = [];
	for (let i = 0; i < 5; i++) {
		posts.push(post);
	}


	return (
		<div className={styles["home-con"]}>
			<div className={styles["home-nav"]}>
				<button className={styles["nav-button"]}>Home</button>
				<button className={styles["nav-button"]}>Trending</button>
			</div>
			<form className={styles["post-form"]}>
				<textarea placeholder="Create a post"></textarea>
				<button>Post</button>
			</form>
			<div className={styles["posts-con"]}>
				{posts.map((post, index) => (
					<Post key={post.id} post={post} />
				))}
			</div>
		</div>
	);
}