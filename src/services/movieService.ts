import axios from "axios";
import type { Movie } from "../types/movie.ts";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesHttpResponse{
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
export const fetchMovies = async (topic: string): Promise<Movie[]> => {
    try {
        const response = await axios.get<MoviesHttpResponse>(
            `https://api.themoviedb.org/3/search/movie`,
            {
                params: {
                    query: topic,
                    language: "en-US",
                    page: 1,
                },
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    Accept: "application/json",
                },
            }
        );
        console.log("TMDB response:", response.data);
        return response.data.results;
    }
    catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};
    
