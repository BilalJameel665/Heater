import styles from './Nav.module.css';
let loggedIn, userId, userName : any;

export default function Nav() {
	return (
		<>
			<nav className={styles.nav}>
				{/* display profile button if logged in*/}
				{loggedIn ? (
					<>
						<a href={`/${userId}`}>{userName}</a>
					</>
				) : (
					<>
						<a>Log In</a>
						<a>Sign Up</a>
					</>
				)}
			</nav>
		</>
	);
}
