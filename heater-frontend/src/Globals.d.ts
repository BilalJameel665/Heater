declare module "*.module.css" {
	const classes: { [key: string]: string };
	export default classes;
}

type Post = {
	text: string;
	author?: string;
};

