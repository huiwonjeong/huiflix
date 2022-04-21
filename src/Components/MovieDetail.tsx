import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { getMovieSearchWithId } from "../api";
import { selectedMovie } from "../atom";
import { makeImagePath } from "../utils";

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
  overflow: hidden;
  z-index: 5;
`;
const DetailCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;
`;
const DetailTitle = styled.div`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 46px;
  position: relative;
  top: -60px;
`;
const DetailOverview = styled.p`
  padding: 20px;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
  top: -70px;
  width: 60%;
`;
interface IMovieDetailProp {
  title: string;
  movieId: number;
}

function MovieDetail({ title, movieId }: IMovieDetailProp) {
  const { scrollY } = useViewportScroll();
  const movie = useRecoilValue(selectedMovie);
  const { data: clickedMovie, isLoading } = useQuery(
    ["movie", movieId + ""],
    () => getMovieSearchWithId(movieId)
  );

  return (
    <AnimatePresence>
      {
        <>
          <MovieDetailWindow
            style={{ top: scrollY.get() + 100 }}
            layoutId={movie.title + movie.movieId}
          >
            {clickedMovie && (
              <>
                <DetailCover
                  style={{
                    backgroundImage: `linear-gradient(to top,black, transparent), url(${makeImagePath(
                      clickedMovie.backdrop_path,
                      "w500"
                    )})`,
                  }}
                />
                <DetailTitle>{clickedMovie.title}</DetailTitle>
                <DetailOverview>{clickedMovie.overview}</DetailOverview>
              </>
            )}
          </MovieDetailWindow>
        </>
      }
    </AnimatePresence>
  );
}
export default MovieDetail;
