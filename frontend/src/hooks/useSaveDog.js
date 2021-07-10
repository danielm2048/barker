import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function useSaveDog() {
	const queryClient = useQueryClient();

	return useMutation(
		async (values) => {
			const { data } = await axios.post("/api/users/save-dog", values);
			return data;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("saved");
			},
		}
	);
}
