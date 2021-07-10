import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function useAddConversation() {
	const queryClient = useQueryClient();

	return useMutation(
		async (values) => {
			const { data } = await axios.post("/api/conversations/", values);
			return data;
		},
		{
			onSettled: () => {
				queryClient.invalidateQueries("conversations");
			},
		}
	);
}
