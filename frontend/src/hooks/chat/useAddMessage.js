import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function useAddMessage() {
	const queryClient = useQueryClient();

	return useMutation(
		async (values) => {
			const { data } = await axios.post("/api/messages/", values);
			return data;
		},
		{
			onSettled: (data) => {
				queryClient.invalidateQueries(["messages", data.conversationId]);
			},
		}
	);
}
