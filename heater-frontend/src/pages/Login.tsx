import { useState } from 'react';
import styles from "./Login.module.css";
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
			const response = await fetch("http://localhost:8000/api/login", {
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
		<div className={styles["loginModule"]}>
			<div className={styles["loginForm"]}>
				<h1 className={styles["loginHeaderText"]}>Login</h1>
				<form onSubmit={handleLogin}>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={values.email}
						onChange={handleChange}
						className= {styles["loginEmailInput"]}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={values.password}
						onChange={handleChange}
						className= {styles["loginPasswordInput"]}
						required
					/>
					{error && <p className= {styles["loginErrorMessage"]}>{error}</p>}
					<button
						type="submit"
						className={styles["loginPageButton"]}
					>
						Log In
					</button>
				</form>
			</div>
		</div>
	);
}