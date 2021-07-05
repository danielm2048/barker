import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { useTokenStore } from "./store";

const queryClient = new QueryClient();

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    const accessToken = useTokenStore.getState().accessToken;
    config.headers = {
      authorization: accessToken ? `bearer ${accessToken}` : "",
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const setAccessToken = useTokenStore.getState().setAccessToken;
    const originalRequest = error.config;
    if (
      error.response.status === 403 &&
      originalRequest.url.includes("api/users/token")
    ) {
      setAccessToken("");
      return Promise.reject(error);
    } else if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await axios.post("/api/users/token");

      if (res.status === 200) {
        setAccessToken(res.data);
      }
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
