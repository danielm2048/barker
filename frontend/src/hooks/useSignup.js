import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useTokenStore } from "../store";

const setAccessToken = useTokenStore.getState().setAccessToken;

export default function useSignup() {
	const queryClient = useQueryClient();

	return useMutation(
		async (values) => {
			const { data } = await axios.post("/api/users/signup", values, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			return data;
		},
		{
			onSuccess: (data) => {
				setAccessToken(data.accessToken);
				queryClient.invalidateQueries("auth");
			},
		}
	);
}
