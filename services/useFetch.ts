import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, authoFetch = true) => {
	const [data, setData] = useState<T | null>(null);
	const [currentData, setCurrentData] = useState<T | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const fetchData = async () => {
		try {
			setLoading(true);
			setError(null);
			setCurrentData(null);

			const result = await fetchFunction();

			setCurrentData(result);
			setData(result);
		} catch (error) {
			setError(error instanceof Error ? error : new Error("An error occurred"));
		} finally {
			setLoading(false);
		}
	};

	const reset = () => {
		setError(null);
		setCurrentData(null);
		setData(null);
		setLoading(false);
	};

	useEffect(() => {
		if (authoFetch) {
			fetchData();
		}
	}, []);

	return { data, currentData, loading, error, refetch: fetchData, reset };
};

export default useFetch;
