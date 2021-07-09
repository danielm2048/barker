import { useQuery } from "react-query";
import axios from "axios";

export default function useSaved() {
  return useQuery("saved", async () => {
    const { data } = await axios.get(`/api/users/saved`);
    return data;
  });
}
