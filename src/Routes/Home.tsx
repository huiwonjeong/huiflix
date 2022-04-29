import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpComingMovies,
  IGetMoviesResult,
} from "../api";
import { makeImagePath } from "../utils";
import { useMatch, useNavigate } from "react-router-dom";
import MovieSlider from "../Components/MovieSlider";
import MovieDetail from "../Components/MovieDetail";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedMovie } from "../atom";

const Wrapper = styled.div`
  background-color: black;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 58px;
  margin-bottom: 20px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`;

const SliderWrapper = styled.div`
  height: 400px;
`;

const MovieDetailWindow = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  top: -80px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  z-index: 5;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function Home() {
  const movieDetailMatch = useMatch("/huiflix/movies/:movieId");
  const { scrollY } = useViewportScroll();

  const { data: nowPlaying, isLoading: nowPlayingLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovies);
  const { data: popular, isLoading: popularLoading } =
    useQuery<IGetMoviesResult>(["movies", "popular"], getPopularMovies);
  const { data: topRated, isLoading: topRatedLoading } =
    useQuery<IGetMoviesResult>(["movies", "topRated"], getTopRatedMovies);
  const { data: upcoming, isLoading: upcomingLoading } =
    useQuery<IGetMoviesResult>(["movies", "upcoming"], getUpComingMovies);
  const [movieInfo, setMovie] = useRecoilState(selectedMovie);

  const navigate = useNavigate();
  const onOverlayClick = () => {
    navigate("/huiflix/");
    setMovie({ title: "", movieId: 0 });
  };

  return (
    <Wrapper>
      {nowPlayingLoading && popularLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}
          >
            <Title>{nowPlaying?.results[0].title}</Title>
            <Overview>{nowPlaying?.results[0].overview}</Overview>
          </Banner>
          <SliderWrapper>
            {nowPlaying ? (
              <MovieSlider title="Now Playing" data={nowPlaying} />
            ) : null}
          </SliderWrapper>
          <SliderWrapper>
            {topRated ? (
              <MovieSlider title="Top Rated" data={topRated} />
            ) : null}
          </SliderWrapper>
          <SliderWrapper>
            {popular ? <MovieSlider title="Popular" data={popular} /> : null}
          </SliderWrapper>
          <SliderWrapper>
            {upcoming ? (
              <MovieSlider title="Up Coming" data={upcoming} />
            ) : null}
          </SliderWrapper>
          {movieDetailMatch && movieInfo.movieId !== 0 ? (
            <AnimatePresence>
              <Overlay
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "tween", duration: 0.5 }}
                onClick={onOverlayClick}
              />
              {movieInfo.movieId !== 0 ? (
                <MovieDetailWindow
                  layoutId={movieInfo.title + movieInfo.movieId}
                  style={{ top: scrollY.get() + 100 }}
                  key={movieInfo.movieId}
                >
                  <MovieDetail />
                </MovieDetailWindow>
              ) : null}
            </AnimatePresence>
          ) : null}
        </>
      )}
    </Wrapper>
  );
}
export default Home;
