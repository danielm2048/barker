import { useQuery } from "react-query";
import axios from "axios";

export default function useAuth() {
	return useQuery(
		"auth",
		async () => {
			const { data } = await axios.get("/api/users/me");
			return data;
		},
		{
			retry: 0,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
		}
	);
}
