import styles from "./Nav.module.css";
let loggedIn, userId, userName: any;

export default function Nav() {
	return (
		<>
			<nav className={styles.nav}>
				{/* display profile button if logged in*/}
				<a href="/" className={styles.navtitle}>
					Heater
				</a>
				{loggedIn ? (
					<>
						<a href={`/${userId}`}>{userName}</a>
					</>
				) : (
					<>
						<div className={styles["nav-right"]}>
							<a href="/login" className={styles["nav-button"]}>Log In</a>
							<a href="/signup" className={styles["nav-button"]}>Sign Up</a>
						</div>
					</>
				)}
			</nav>
		</>
	);
}
