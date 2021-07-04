import { useQuery } from "react-query";
import axios from "axios";

export default function useProfile(userId) {
	return useQuery(["profile", userId], async () => {
		const { data } = await axios.get(`/api/users/${userId}`);
		return data;
	});
}
