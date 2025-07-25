import { useState } from 'react';
import styles from "./SignUp.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router';
export default function SignUp() {
	const [values, setValues] = useState<{
		email: string;
		username: string;
		dob: Date | null;
		password: string;
		confirmedPassword: string;
	}>({
		email: "",
		username: "",
		dob: null,
		password: "",
		confirmedPassword: "",
	});

	const [error, setError] = useState("");
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");

		try {

			if (values.password == values.confirmedPassword) {
				const response = await fetch("/api/users", {
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

					}),
				});

				if (response.ok) {
					console.log("SignUp successful");
				} else {
					const data = await response.json();
					setError(data.message || "SignUp failed");
				}
			}
			else{
				setError("Passwords do not match");
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
						className={styles["signup-email"]}
						required
					/>
					<input
						type="text"
						name="username"
						placeholder="Username"
						value={values.username}
						onChange={handleChange}
						className={styles["signup-username"]}
						required
					/>
					<DatePicker
						selected={values.dob}
						onChange={(date) => setValues({ ...values, dob: date })}
						dateFormat="MM-dd-yyyy"
						placeholderText="Date of birth (mm-dd-yyyy)"
						maxDate={new Date()}
						className={styles["signup-dob"]}
						showYearDropdown
						scrollableYearDropdown
						yearDropdownItemNumber={100}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={values.password}
						onChange={handleChange}
						className={styles["signup-password"]}
						required
					/>
					<input
						type="password"
						name="confirmedPassword"
						placeholder="Confirm Password"
						value={values.confirmedPassword}
						onChange={handleChange}
						className={styles["signup-password-confirmation"]}
						required
					/>
					{error && <p className={styles["signup-error-message"]}>{error}</p>}
					<button
						type="submit"
						className={styles["signup-submit-button"]}
					>
						Register
					</button>
					<Link to="/login" className={styles["login-link"]}>Already have an account?</Link>
				</form>
			</div>
		</div>
	);
}