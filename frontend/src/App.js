import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";

import { useTokenStore } from "./store";
import useRefreshToken from "./hooks/useRefreshToken";

import Routes from "./Routes";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Loader from "./components/Loader";

function App() {
	const accessToken = useTokenStore((state) => state.accessToken);
	const setAccessToken = useTokenStore((state) => state.setAccessToken);

	const { loading, error, mutate } = useRefreshToken(setAccessToken);

	axios.defaults.headers.common["authorization"] = `bearer ${accessToken}`;

	axios.defaults.withCredentials = true;

	axios.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest = error.config;
			if (
				error.response.status === 403 &&
				originalRequest.url.includes("api/users/token")
			) {
				setAccessToken("");
				return Promise.reject(error);
			} else if (error.response.status === 403 && !originalRequest._retry) {
				originalRequest._retry = true;

				mutate();

				return axios(originalRequest);
			}
			return Promise.reject(error);
		}
	);

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
			<div className="App">
				<Routes />
			</div>
			<Footer />
		</>
	);
}

export default App;
