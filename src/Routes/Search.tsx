import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  getMovieSearchWithkeyWord,
  getTvSearchWithkeyWord,
  IGetMoviesResult,
  ITvsResult,
} from "../api";
import MovieGrid from "../Components/MovieGrid";
import TvGrid from "../Components/TvGrid";

const Wrapper = styled.div``;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data: searchedMovie, isLoading: searchedMovieLoading } =
    useQuery<IGetMoviesResult>(["movie", keyword], () =>
      getMovieSearchWithkeyWord(keyword ?? "")
    );
  const { data: searchedTv, isLoading: searchedTvLoading } =
    useQuery<ITvsResult>(["tv", keyword], () =>
      getTvSearchWithkeyWord(keyword ?? "")
    );
  return (
    <Wrapper>
      {searchedMovie ? <MovieGrid data={searchedMovie} /> : null}
      {searchedTv ? <TvGrid data={searchedTv} /> : null})
    </Wrapper>
  );
}
export default Search;
