export default function Nav() {
	return (
		<>
			<nav>
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
