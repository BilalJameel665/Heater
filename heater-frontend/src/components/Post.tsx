import styles from "./Post.module.css";
import ThumbsUpIcon from "../assets/thumb_up.svg";
import ThumbsDownIcon from "../assets/thumb_down.svg";
import CommentIcon from "../assets/comment.svg";
import ViewIcon from "../assets/visibility.svg";
import RepostIcon from "../assets/repost.svg";
import ShareIcon from "../assets/share.svg";

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
			<hr />
			<div className={styles["post-analytics"]}>
				<span><ThumbsUpIcon />{post.metrics.likeCount}</span>
				<span><ThumbsDownIcon />{post.metrics.dislikeCount}</span>
				<span><CommentIcon />{post.metrics.commentCount}</span>
				<span><RepostIcon />{post.metrics.viewCount}</span>
				<span><ViewIcon />{post.metrics.repostCount}</span>
				<span><ShareIcon /></span>
			</div>
		</div>
	);
}
