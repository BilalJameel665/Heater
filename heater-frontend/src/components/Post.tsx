import styles from "./Post.module.css";

export default function Post({ post }: { post: Post }) {
	return (
		<div className={styles["post-con"]}>
			<div className={styles["post-header"]}>
				<div className={styles["post-author"]}>{post.author}</div>
				<div className={styles["post-options"]}>
					<span className="material-symbols-outlined">more_horiz</span>
				</div>
			</div>
			<p className={styles["post-text"]}>{post.text}</p>
			<div className={styles["post-analytics"]}>{/* likes, comments */}</div>
		</div>
	);
}
