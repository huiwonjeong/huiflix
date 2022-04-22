const API_KEY = "2d284ae8e0190d6bc4a5a8b5a3c68886";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IDate {
  maximum: string;
  minimum: string;
}

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGetMoviesResult {
  dates: IDate;
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetMovieCast {
  id: number;
  cast: Cast[];
  crew: Cast[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: string;
  job?: string;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getPopularMovies() {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getTopRatedMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getUpComingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMovieSearchWithId(movieId: number) {
  return fetch(`${BASE_PATH}/movie/${movieId + ""}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getMovieCreditWithId(movieId: number) {
  return fetch(
    `${BASE_PATH}/movie/${movieId + ""}/credits?api_key=${API_KEY}`
  ).then((response) => response.json());
}

export function getSimilerMovieWithId(movieId: number) {
  return fetch(
    `${BASE_PATH}/movie/${movieId + ""}/similar?api_key=${API_KEY}`
  ).then((response) => response.json());
}
