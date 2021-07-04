import { useQuery } from "react-query";
import axios from "axios";

export default function usePets(city) {
	return useQuery("pets", async () => {
		const { data } = await axios.get(`/api/dogs/?location=${city}`);
		return data;
	});
}
