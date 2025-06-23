import { Outlet } from "react-router";
import Nav from "./Nav";
import Footer from "./Footer";
import Post from "./Post";

export default function Layout() {
	const post : Post = {
		text: "oeioigewegi",
		author: "Tommy Chabiras"
	}


	return (
		<>
			<Nav />
			<main>
				<Outlet />
			</main>
			<Footer />
			<Post post={post} />
		</>
	);
}
