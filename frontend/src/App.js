import React, { useEffect } from "react";
import "./App.css";

import useRefreshToken from "./hooks/useRefreshToken";

import Routes from "./Routes";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Loader from "./components/Loader";

function App() {
	const { loading, error, mutate } = useRefreshToken();

	useEffect(() => {
		mutate();
	}, [mutate]);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		console.error(error);
	}

	return (
		<>
			<Navbar />
			<Routes />
			<Footer />
		</>
	);
}

export default App;
