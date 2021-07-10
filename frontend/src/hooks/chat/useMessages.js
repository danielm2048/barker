import axios from "axios";
import { useQuery } from "react-query";

export default function useMessages(conversationId) {
	return useQuery(["messages", conversationId], async () => {
		const { data } = await axios.get(`/api/messages/${conversationId}`);
		return data;
	});
}
