import axios from "axios";
import { useQuery } from "react-query";

let cancelToken;

export default function useCities(searchText) {
	return useQuery("cities", () => {
		// Create a new CancelToken source for this request
		if (typeof cancelToken != typeof undefined) {
			cancelToken.cancel("Operation canceled due to new request.");
		}

		cancelToken = axios.CancelToken.source();

		const promise = axios.get(`/api/cities/?searchText=${searchText}`, {
			// Pass the source token to your request
			cancelToken: cancelToken.token,
		});

		return promise;
	});
}
