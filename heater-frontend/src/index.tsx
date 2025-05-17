import React from "react";
import ReactDOM from "react-dom/client";

const App: React.FC = () => {
  return <h1>Hello from React + TypeScript + Webpack!</h1>;
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);