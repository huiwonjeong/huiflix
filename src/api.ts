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

export interface IGetCast {
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

export interface IClickedTv {
  adult: boolean;
  backdrop_path: string;
  episode_run_time: number[];
  first_air_date: Date;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: Date;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface IClickedMovie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: Date;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ITvsResult {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  backdrop_path: null | string;
  first_air_date: Date;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
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

export function getOnTheAirTv() {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTopRatedTv() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTvRecommandationsWithId(tvId: number) {
  return fetch(
    `${BASE_PATH}/tv/${tvId + ""}/recommendations?api_key=${API_KEY}`
  ).then((response) => response.json());
}

export function getTvSearchWithId(tvId: number) {
  return fetch(`${BASE_PATH}/tv/${tvId + ""}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getTvCreditWithId(tvId: number) {
  return fetch(`${BASE_PATH}/tv/${tvId + ""}/credits?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getSimilerTvWithId(tvId: number) {
  return fetch(`${BASE_PATH}/tv/${tvId + ""}/similar?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMovieSearchWithkeyWord(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
}

export function getTvSearchWithkeyWord(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
}
