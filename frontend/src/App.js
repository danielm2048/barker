import React from "react";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Routes from "./Routes";
import Footer from "./components/layout/Footer";

function App() {
	return (
		<>
			<Navbar />
			<div className="App">
				<Routes />
			</div>
			<Footer />
		</>
	);
}

export default App;
