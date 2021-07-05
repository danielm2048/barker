import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function useAddDog() {
  const queryClient = useQueryClient();

  return useMutation(
    async (values) => {
      const { data } = await axios.post("/api/dogs/add", values, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("dogs");
      },
    }
  );
}
