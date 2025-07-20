import Post from "../components/Post";
import styles from "./Home.module.css"

export default function Home() {
	const post : Post = {
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		author: "Tommy Chabiras",
		metrics: {likeCount: 500, dislikeCount: 1000, viewCount: 200000, repostCount: 20, commentCount: 3}
	}

	return (
		<div className={styles["home-con"]}>
			<div>
				<h1>Home page</h1>
			</div>
			<form className={styles["post-form"]}>
				<textarea placeholder="Create a post"></textarea>
				<button>Post</button>
			</form>
			<Post post={post} />
			<Post post={post} />
			<Post post={post} />
			<Post post={post} />
			<Post post={post} />
		</div>
	);
}