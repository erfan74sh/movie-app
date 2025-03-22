import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useDebounce from "@/hooks/useDebounce";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/supabase";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const debouncedVal = useDebounce(searchQuery);

	const {
		currentData: movies,
		loading,
		error,
		refetch: loadMovies,
		reset,
	} = useFetch(() => fetchMovies({ query: debouncedVal }), false);

	useEffect(() => {
		const fetch = async () => {
			if (debouncedVal && debouncedVal.trim()) {
				await loadMovies();
			} else {
				reset();
			}
		};
		fetch();
	}, [debouncedVal]);

	useEffect(() => {
		if (movies?.length > 0 && movies?.[0]) {
			updateSearchCount(debouncedVal, movies[0]);
		}
	}, [movies]);

	return (
		<View className="flex-1 bg-primary">
			<Image
				source={images.bg}
				className="w-full flex-1 absolute z-0"
				resizeMode="cover"
			/>
			<FlatList
				data={movies}
				renderItem={({ item }) => <MovieCard {...item} />}
				keyExtractor={(item) => item.id.toString()}
				numColumns={3}
				className="px-5"
				columnWrapperStyle={{
					justifyContent: "center",
					gap: 16,
					marginVertical: 16,
				}}
				contentContainerStyle={{
					paddingBottom: 100,
				}}
				ListHeaderComponent={
					<>
						<View className="w-full flex-row justify-center mt-10 items-center">
							<Image source={icons.logo} className="w-12 h-10" />
						</View>
						<View className="my-5">
							<SearchBar
								placeholder="Search for a movie ..."
								value={searchQuery}
								onChangeText={(text) => setSearchQuery(text)}
							/>
						</View>
						{loading && (
							<ActivityIndicator
								size="large"
								color="#0000ff"
								className="my-3"
							/>
						)}
						{error && (
							<Text className="text-red-500 px-5 my-3">
								Error: {error.message}
							</Text>
						)}

						{!loading && !error && searchQuery.trim() && movies?.length > 0 && (
							<Text className="text-xl text-white font-bold">
								Search Results for{" "}
								<Text className="text-accent">{searchQuery}</Text>
							</Text>
						)}
					</>
				}
				ListEmptyComponent={
					!loading && !error ? (
						<View className="mt-10 px-5">
							<Text className="text-center text-gray-500">
								{searchQuery.trim() ? "No movie found!" : "Search for a movie"}
							</Text>
						</View>
					) : null
				}
			/>
		</View>
	);
};

export default Search;
