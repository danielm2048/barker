import { useMutation } from "react-query";
import axios from "axios";

export default function useRefreshToken(setAccessToken) {
	return useMutation(
		() => axios.post("/api/users/token").then((res) => res.data),
		{
			onSuccess: (token) => setAccessToken(token),
		}
	);
}
