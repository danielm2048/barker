import { useQuery } from "react-query";
import axios from "axios";

export default function useDogs(query) {
	return useQuery("dogs", async () => {
		const { data } = await axios.get(`/api/dogs/${query}`);
		return data;
	});
}
