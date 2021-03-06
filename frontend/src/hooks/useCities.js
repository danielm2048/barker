import axios from "axios";
import { useQuery } from "react-query";

export default function useCities() {
	return useQuery(
		"cities",
		async () => {
			const { data } = await axios.get("/api/cities/");
			return data;
		},
		{
			refetchOnMount: false,
		}
	);
}
