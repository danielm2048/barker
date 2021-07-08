import React, { useEffect } from "react";
import "./App.css";

import useRefreshToken from "./hooks/useRefreshToken";

import { useDrawerStore } from "./store";

import Routes from "./Routes";
import Navbar from "./components/layout/Navbar";
import Toast from "./components/layout/Toast";
import Footer from "./components/layout/Footer";
import Loader from "./components/Loader";

import { Main, Canvas } from "./styles/StyledLayout";

function App() {
	const { loading, error, mutate } = useRefreshToken();

	const { open, setOpen } = useDrawerStore();

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
			<Main>
				<Canvas drawer={open} onClick={() => setOpen(false)} />
				<Navbar />
				<Routes />
				<Toast />
				<Footer />
			</Main>
		</>
	);
}

export default App;
