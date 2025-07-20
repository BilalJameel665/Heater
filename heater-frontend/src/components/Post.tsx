import styles from "./Post.module.css";
import ThumbsUpIcon from "../assets/thumb_up.svg";
import ThumbsDownIcon from "../assets/thumb_down.svg";
import CommentIcon from "../assets/comment.svg";
import ViewIcon from "../assets/visibility.svg";
import RepostIcon from "../assets/repost.svg";
import ShareIcon from "../assets/share.svg";
import OptionIcon from "../assets/more_horiz.svg";
import { Link } from "react-router";

export default function Post({ post }: { post: Post }) {
	return (
		<div className={styles["post-con"]}>
			<div className={styles["post-header"]}>
				<div className={styles["post-author"]}><Link to={`/${post.author}`}>{post.author}</Link></div>
				<div className={styles["post-options"]}>
					<button><OptionIcon /></button>
				</div>
			</div>
			<p className={styles["post-text"]}>{post.text}</p>
			<hr />
			<div className={styles["post-analytics"]}>
				<button><ThumbsUpIcon />{post.metrics.likeCount}</button>
				<button><ThumbsDownIcon />{post.metrics.dislikeCount}</button>
				<button><CommentIcon />{post.metrics.commentCount}</button>
				<button><RepostIcon />{post.metrics.viewCount}</button>
				<button><ViewIcon />{post.metrics.repostCount}</button>
				<button><ShareIcon /></button>
			</div>
		</div>
	);
}
