import styles from "./Post.module.css";
import ThumbsUpIcon from "../assets/thumb_up.svg";
import ThumbsDownIcon from "../assets/thumb_down.svg";
import CommentIcon from "../assets/comment.svg";
import ViewIcon from "../assets/visibility.svg";
import RepostIcon from "../assets/repost.svg";
import ShareIcon from "../assets/share.svg";
import OptionIcon from "../assets/more_horiz.svg";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import PostButton from "./PostButton";

export default function Post({ post }: { post: Post }) {
	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState<Post[]>([]);
	console.log(post.parentId);
	useEffect(() => {
		if (showComments) getComments();
	}, [showComments]);

	async function getComments() {
		setComments([{
		id: 2,
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		author: "aaa",
		metrics: {likeCount: 500, dislikeCount: 1000, viewCount: 200000, repostCount: 20, commentCount: 3},
		parentId: 1
	},
	{
		id: 3,
		text: "test",
		author: "bbb",
		metrics: {likeCount: 500, dislikeCount: 1000, viewCount: 200000, repostCount: 20, commentCount: 3},
		parentId: 1
	
	}]);
		// try {
		// 	const response = await fetch("/api/posts/{id}/comments");
		// 	if (!response.ok) throw new Error("Failed to retrieve comments");
		// 	setComments(await response.json());
		// }
		// catch (error) {
		// 	setShowComments(false);
		// 	console.error("Error: ", error);
		// }
	}

	return (
		<div className={styles[post.parentId ? "comment-con" : "post-con"]}>
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
				<button onClick={() => setShowComments(!showComments)}><CommentIcon />{post.metrics.commentCount}</button>
				<button><RepostIcon />{post.metrics.viewCount}</button>
				<button><ViewIcon />{post.metrics.repostCount}</button>
				<button><ShareIcon /></button>
			</div>
			{showComments && (
				<div className={styles["comments-con"]}>
					<div className={styles["comment-form-con"]}>
						<textarea placeholder="Post a comment"></textarea>
						<PostButton>Comment</PostButton>
					</div>
					{comments.map((comment) => (
						<Post key={comment.id} post={comment} />
					))}
				</div>
			)}
		</div>
	);
}
