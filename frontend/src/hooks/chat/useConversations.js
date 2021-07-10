import axios from "axios";
import { useQuery } from "react-query";

export default function useConversations() {
	return useQuery("conversations", async () => {
		const { data } = await axios.get("/api/conversations/");
		return data;
	});
}
