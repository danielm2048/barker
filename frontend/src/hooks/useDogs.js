import { useQuery } from "react-query";
import axios from "axios";

export default function useDogs(city) {
	return useQuery("dogs", async () => {
		const { data } = await axios.get(`/api/dogs/?location=${city}`);
		return data;
	});
}
