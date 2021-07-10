import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function useUnsaveDog() {
	const queryClient = useQueryClient();

	return useMutation(
		async (values) => {
			const { data } = await axios.delete("/api/users/unsave-dog", {
				data: values,
			});
			return data;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("saved");
			},
		}
	);
}
