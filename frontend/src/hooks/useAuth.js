import { useQuery } from "react-query";
import axios from "axios";

export default function useAuth() {
	return useQuery(
		"auth",
		() => axios.get("/api/users/me").then((res) => res.data),
		{
			retry: 1,
		}
	);
}
