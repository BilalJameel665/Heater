import styles from "./Nav.module.css";
import { Link } from "react-router";
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
							<Link to="/login" className={styles["nav-button"]}>Log In</Link>
							<Link to="/signup" className={styles["nav-button"]}>Sign Up</Link>
						</div>
					</>
				)}
			</nav>
		</>
	);
}
