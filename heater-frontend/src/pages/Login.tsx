import { useState } from 'react';
import styles from "./Login.module.css";
import { Link } from 'react-router';
export default function Login() {
	const [values, setValues] = useState({ email: "", password: ""});
	const [error, setError]= useState("");
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include", 
				body: JSON.stringify({
					email: values.email,
					password: values.password,
				}),
			});

			if (response.ok) {
				console.log("Login successful");
			} else {
				const data = await response.json();
				setError(data.message || "Login failed");
			}
		} catch (err) {
			setError("Network error");
		}
	};

return (
		<div className={styles["login-module"]}>
			<div className={styles["login-form"]}>
				<form onSubmit={handleLogin}>
					<h1 className={styles["login-header-text"]}>Login</h1>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={values.email}
						onChange={handleChange}
						className= {styles["login-email"]}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={values.password}
						onChange={handleChange}
						className= {styles["login-password"]}
						required
					/>
					{error && <p className= {styles["login-error-message"]}>{error}</p>}
					<button
						type="submit"
						className={styles["login-submit-button"]}
					>
						Log In
					</button>
					<Link to="/signup" className={styles["signup-link"]}>Create an account?</Link>
				</form>
			</div>
		</div>
	);
}