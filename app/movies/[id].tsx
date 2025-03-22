import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovieDetail } from "@/services/api";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
	label: string;
	value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
	<View className="flex-col items-start justify-center mt-5">
		<Text className="text-light-200 font-normal text-sm">{label}</Text>
		<Text className="text-light-100 font-bold text-sm mt-2 text-justify">
			{value || "N/A"}
		</Text>
	</View>
);

const MovieDetails = () => {
	const { id } = useLocalSearchParams();

	const {
		data: movieDetail,
		loading,
		error,
	} = useFetch(() => fetchMovieDetail(id as string));

	return (
		<View className="bg-primary flex-1 pb-16">
			<ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
				<View>
					<Image
						source={{
							uri: `https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`,
						}}
						className="w-full h-[550px]"
						// resizeMode="stretch"
					/>
				</View>
				<View className="flex-col items-start justify-center mt-5 px-5">
					<Text className="text-white font-bold text-xl">
						{movieDetail?.title}
					</Text>
					<View className="flex-row items-center gap-x-1 mt-2">
						<Text className="text-light-200 text-sm">
							{movieDetail?.release_date?.split("-")[0]}
						</Text>
						<Text className="text-light-200 text-sm">.</Text>

						<Text className="text-light-200 text-sm">
							{movieDetail?.runtime}m
						</Text>
					</View>
					<View className="flex-row items-center bg-dark-100 px-3 py-1.5 rounded-md gap-x-1 mt-2">
						<Image source={icons.star} className="size-4" />
						<Text className=" text-white font-bold text-sm">
							{Math.round(movieDetail?.vote_average ?? 0)}/10
						</Text>
						<Text className="text-lime-200 text-sm">
							({movieDetail?.vote_count} votes)
						</Text>
					</View>
					<MovieInfo label="Overview" value={movieDetail?.overview} />
					<View className="flex-row w-full items-center">
						<View className="w-1/2">
							<MovieInfo
								label="Release date"
								value={movieDetail?.release_date}
							/>
						</View>
						<View className="w-1/2">
							<MovieInfo label="Status" value={movieDetail?.status} />
						</View>
					</View>
					<View className="flex-col items-start justify-center mt-5">
						<Text className="text-light-200 font-normal text-sm"> Generes</Text>
						<View className="flex-row gap-x-2">
							{movieDetail?.genres ? (
								movieDetail.genres.map((genere) => (
									<Text
										key={genere.name}
										className=" bg-dark-100 px-2 py-1 rounded-md text-sm text-light-100 font-bold mt-2 text-justify"
									>
										{genere.name}
									</Text>
								))
							) : (
								<Text className="  txt-sm text-light-100 font-bold mt-2 ">
									"N/A"
								</Text>
							)}
						</View>
					</View>
					<MovieInfo
						label="Countries"
						value={movieDetail?.production_countries
							?.map((country) => country.name)
							.join(" - ")}
					/>
					<View className="flex-row w-full items-center">
						<View className="w-1/2">
							<MovieInfo
								label="Budget"
								value={
									movieDetail?.budget &&
									`$${movieDetail?.budget / 1000000} million`
								}
							/>
						</View>
						<View className="w-1/2">
							<MovieInfo
								label="Revenue"
								value={
									movieDetail?.revenue &&
									`$${Math.round(movieDetail?.revenue) / 1000000}`
								}
							/>
						</View>
					</View>
					<MovieInfo
						label="Production companies"
						value={
							movieDetail?.production_companies
								.map((company) => company.name)
								.join(" - ") || "N/A"
						}
					/>
				</View>
			</ScrollView>
			<TouchableOpacity
				className="absolute bottom-16 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
				onPress={router.back}
			>
				<Image
					source={icons.arrow}
					className="size-5 mr-1 mt-0.5 rotate-180"
					tintColor="#fff"
				/>
				<Text className="text-white font-semibold text-base">Go back</Text>
			</TouchableOpacity>
		</View>
	);
};

export default MovieDetails;

const styles = StyleSheet.create({});
