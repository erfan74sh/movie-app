import { supabase } from "./supabaseConfig";

export const getAllMetrics = async () => {
	const { data, error } = await supabase.from("metrics").select();
	console.log({ data, error });
};

export const updateSearchCount = async (query: string, movie: Movie) => {
	console.log("CALLING updateSearchCount");
	const { data, error } = await supabase
		.from("metrics")
		.select()
		.eq("searchTerm", query);
	if (data && data.length) {
		const existingMovie = data[0];
		await supabase
			.from("metrics")
			.update({ count: existingMovie.count + 1 })
			.eq("id", existingMovie.id);
	} else {
		const { error } = await supabase.from("metrics").insert({
			searchTerm: query,
			movie_id: movie.id,
			count: 1,
			title: movie.title,
			poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
		});
	}
};

export const getTrendingMovies = async (): Promise<
	TrendingMovie[] | undefined
> => {
	try {
		const { data, error } = await supabase
			.from("metrics")
			.select()
			.order("count", { ascending: false })
			.limit(5);
		return data as unknown as TrendingMovie[];
		if (data) {
		}
	} catch (error) {
		console.error(error);
	}
};
