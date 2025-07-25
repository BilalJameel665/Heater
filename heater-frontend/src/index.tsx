import "./global.css"
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App: React.FC = () => {
	return <h1>Hello from React + TypeScript + Webpack!</h1>;
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="/signup" element ={<SignUp />}/>
				<Route path="/login" element={<Login />} />
			</Route>
		</Routes>
	</BrowserRouter>
);
