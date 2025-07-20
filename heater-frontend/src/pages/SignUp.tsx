import { useState } from 'react';
import styles from "./Signup.module.css";
import { Link } from 'react-router';
export default function SignUp() {
	const [values, setValues] = useState({ email: "", username:"", dob: "",password: "", confirmedPassword: ""});
	const [error, setError]= useState("");
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");

		try {
			const response = await fetch("http://localhost:8000/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: "include", 
				body: JSON.stringify({
					email: values.email,
					username: values.username,
					dob: values.dob,
					password: values.password,
					confirmedPassword: values.confirmedPassword,

				}),
			});

			if (response.ok) {
				console.log("SignUp successful");
			} else {
				const data = await response.json();
				setError(data.message || "SignUp failed");
			}
		} catch (err) {
			setError("Network error");
		}
	};
	return (
		<div className={styles["signup-module"]}>
			<div className={styles["signup-form"]}>
				<form onSubmit={handleSignUp}>
					<h1 className={styles["signup-header-text"]}>Sign Up</h1>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={values.email}
						onChange={handleChange}
						className= {styles["signup-email"]}
						required
					/>
					<input
						type="username"
						name="username"
						placeholder="Username"
						value={values.username}
						onChange={handleChange}
						className= {styles["signup-username"]}
						required
					/>
					<input
						type="dob"
						name="dob"
						placeholder="mm/dd/yyyy"
						value={values.dob}
						onChange={handleChange}
						className= {styles["signup-dob"]}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={values.password}
						onChange={handleChange}
						className= {styles["signup-password"]}
						required
					/>
										<input
						type="confirmedPassword"
						name="confirmedPassword"
						placeholder="Confirm Password"
						value={values.confirmedPassword}
						onChange={handleChange}
						className= {styles["signup-password-confirmation"]}
						required
					/>
					{error && <p className= {styles["signup-error-message"]}>{error}</p>}
					<button
						type="submit"
						className={styles["signup-submit-button"]}
					>
						Register
					</button>
					<Link to="/signup" className={styles["login-link"]}>Already have an account?</Link>
				</form>
			</div>
		</div>
	);
}