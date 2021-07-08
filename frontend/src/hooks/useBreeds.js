import axios from "axios";
import { useQuery } from "react-query";

export default function useBreeds() {
	return useQuery(
		"breeds",
		async () => {
			const { data } = await axios.get("/api/dogs/breeds");
			return data;
		},
		{
			refetchOnMount: false,
		}
	);
}
