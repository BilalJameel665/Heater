declare module "*.module.css" {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.svg' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}


type Post = {
	id: number;
	text: string;
	author: string;
	metrics: {[key: string]: number};
	parentId?: number;
};