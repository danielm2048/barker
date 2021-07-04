import { useMutation } from "react-query";
import axios from "axios";
import { useTokenStore } from "../store";

const setAccessToken = useTokenStore.getState().setAccessToken;

export default function useRefreshToken() {
	return useMutation(
		async () => {
			const { data } = await axios.post("/api/users/token");
			return data;
		},
		{
			retry: 0,
			onSuccess: (token) => setAccessToken(token),
		}
	);
}
