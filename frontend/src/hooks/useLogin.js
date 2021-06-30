import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function useLogin(setAccessToken) {
	const queryClient = useQueryClient();

	return useMutation(
		(values) => axios.post("/api/users/login", values).then((res) => res.data),
		{
			onSuccess: (data) => {
				setAccessToken(data.accessToken);
				queryClient.setQueryData("auth", data.user);
			},
		}
	);
}
