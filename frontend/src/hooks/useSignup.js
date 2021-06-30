import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function useSignup(setAccessToken) {
	const queryClient = useQueryClient();

	return useMutation(
		(values) =>
			axios
				.post({ url: "/api/users/signup", data: values })
				.then((res) => res.data),
		{
			onSuccess: (data) => {
				setAccessToken(data.accessToken);
				queryClient.setQueryData("auth", data.user);
			},
		}
	);
}
