import styles from "./PostButton.module.css";

export default function PostButton({ children }: { children: React.ReactNode}) {
	return <button className={styles["post-button"]}>{children}</button>
}