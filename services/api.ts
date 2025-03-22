export const TMDB_CONFIG = {
	BASE_URL: "https://api.themoviedb.org/3",
	API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
	},
};

export const fetchMovies = async ({ query }: { query: string }) => {
	const endpoint = query
		? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
		: `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

	console.log(endpoint);
	const response = await fetch(endpoint, {
		method: "GET",
		headers: TMDB_CONFIG.headers,
	});

	if (!response.ok) {
		console.log(response);
		// @ts-ignore
		throw new Error("Failed to fetch movies", response.statusText);
	}

	const data = await response.json();

	return data.results;
};

export const fetchMovieDetail = async (
	movieId: string
): Promise<MovieDetails> => {
	try {
		const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}`, {
			method: "GET",
			headers: TMDB_CONFIG.headers,
		});

		if (!response.ok) {
			throw new Error("Failed to fetch movie details");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

const url =
	"/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
