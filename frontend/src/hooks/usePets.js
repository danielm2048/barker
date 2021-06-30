import { useQuery } from "react-query";
import axios from "axios";

export default function usePets(city) {
	return useQuery("pets", () =>
		axios.get(`/api/dogs/?location=${city}`).then((res) => res.data)
	);
}
