import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useTokenStore } from "../store";

const setAccessToken = useTokenStore.getState().setAccessToken;

export default function useLogout() {
	const queryClient = useQueryClient();

	return useMutation(
		async () => {
			await axios.post("/api/users/logout");
		},
		{
			onSuccess: () => {
				setAccessToken("");
				queryClient.resetQueries();
			},
		}
	);
}
