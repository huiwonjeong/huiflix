import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  getMovieCreditWithId,
  getMovieSearchWithId,
  getSimilerMovieWithId,
  IGetMovieCast,
  IGetMoviesResult,
} from "../api";
import { selectedMovie } from "../atom";
import { makeImagePath } from "../utils";

//Styled Components

const MovieDetailWrapper = styled.div``;

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
const DetailYear = styled.div`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 20px;
`;

const RunTime = styled.div`
  color: ${(props) => props.theme.white.lighter};
  padding-left: 10px;
  font-size: 20px;
`;
const MovieInfoFirstSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  top: -60px;
`;
const TimeInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const MovieIcon = styled.svg`
  width: 25px;
  height: 25px;
`;

const DetailOverview = styled.p`
  padding: 20px;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
`;

const StarIcon = styled.svg`
  width: 25px;
  height: 25px;
  margin-right: 5px;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:nth-child(4) {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  &:nth-child(3) {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 20px;
  background-color: #ecf0f1;
  color: ${(props) => props.theme.black.darker};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Score = styled.div`
  position: relative;
  padding-right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;
const MovieInfoSecondSection = styled(MovieInfoFirstSection)`
  flex-direction: column;
  align-items: flex-end;
  top: -40px;
`;
const Genres = styled(Score)`
  font-size: 17px;
  color: gray;
`;

const Genre = styled.p`
  margin-left: 10px;
  color: ${(props) => props.theme.white.darker};
`;

const Casts = styled(Genres)``;

const Cast = styled(Genre)``;

const SimilerMovieSection = styled.div`
  padding: 10px;
  padding-top: 70px;
`;
const SimilerMovieTitle = styled.div`
  color: ${(props) => props.theme.white.lighter};
  font-size: 36px;
  position: relative;
`;
const SimilerMovies = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

//Varients
const BoxVariants = {
  nomal: {
    scale: 1,
    transition: {
      type: "tween",
    },
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVarients = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

//Interface

interface IGenreProp {
  id: number;
  name: string;
}

function MovieDetail() {
  const movie = useRecoilValue(selectedMovie);
  const { data: clickedMovie, isLoading: clikedMovieLoading } = useQuery(
    ["movie", movie.movieId + ""],
    () => getMovieSearchWithId(movie.movieId)
  );
  const { data: movieCredit, isLoading: movieCreditLoading } =
    useQuery<IGetMovieCast>(["movie", movie.movieId + " credit"], () =>
      getMovieCreditWithId(movie.movieId)
    );
  const { data: similerMovie, isLoading: similerMovieLoading } =
    useQuery<IGetMoviesResult>(["movie", movie.movieId + " similer"], () =>
      getSimilerMovieWithId(movie.movieId)
    );

  return (
    <>
      {clickedMovie && movieCredit && similerMovie ? (
        <MovieDetailWrapper>
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
              <MovieInfoFirstSection>
                <TimeInfo>
                  <DetailYear>
                    {new Date(clickedMovie.release_date).getFullYear()}
                  </DetailYear>
                  <MovieIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M463.1 32h-416C21.49 32-.0001 53.49-.0001 80v352c0 26.51 21.49 48 47.1 48h416c26.51 0 48-21.49 48-48v-352C511.1 53.49 490.5 32 463.1 32zM111.1 408c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8L111.1 408zM111.1 280c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V280zM111.1 152c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8L111.1 152zM351.1 400c0 8.836-7.164 16-16 16H175.1c-8.836 0-16-7.164-16-16v-96c0-8.838 7.164-16 16-16h160c8.836 0 16 7.162 16 16V400zM351.1 208c0 8.836-7.164 16-16 16H175.1c-8.836 0-16-7.164-16-16v-96c0-8.838 7.164-16 16-16h160c8.836 0 16 7.162 16 16V208zM463.1 408c0 4.418-3.582 8-8 8h-47.1c-4.418 0-7.1-3.582-7.1-8l0-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V408zM463.1 280c0 4.418-3.582 8-8 8h-47.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V280zM463.1 152c0 4.418-3.582 8-8 8h-47.1c-4.418 0-8-3.582-8-8l0-48c0-4.418 3.582-8 7.1-8h47.1c4.418 0 8 3.582 8 8V152z"
                      fill="#e74c3c"
                    />
                  </MovieIcon>
                  <RunTime>
                    {`${Math.floor(clickedMovie.runtime / 60)} hour ${
                      clickedMovie.runtime % 60
                    } min`}
                  </RunTime>
                </TimeInfo>
                <Score>
                  <StarIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"
                      fill="#f1c40f"
                    />
                  </StarIcon>
                  {clickedMovie.vote_average.toFixed(1)}
                </Score>
              </MovieInfoFirstSection>
              <MovieInfoSecondSection>
                <Genres>
                  Genres:
                  {clickedMovie.genres.map(
                    (item: IGenreProp, index: number) => (
                      <Genre>
                        {item.name}
                        {index !== clickedMovie.genres.length - 1 ? ", " : null}
                      </Genre>
                    )
                  )}
                </Genres>
                <Casts>
                  Cast:
                  {movieCredit.cast
                    .slice(0, 3)
                    .map((item: IGenreProp, index: number) => (
                      <Cast>
                        {item.name}
                        {index !== 2 ? ", " : null}
                      </Cast>
                    ))}
                </Casts>
              </MovieInfoSecondSection>
              <DetailOverview>{clickedMovie.overview}</DetailOverview>

              <SimilerMovieSection>
                <SimilerMovieTitle>Similer Movies</SimilerMovieTitle>
                <SimilerMovies>
                  {similerMovie.results.slice(0, 6).map((smovie) => (
                    <Box
                      variants={BoxVariants}
                      bgPhoto={makeImagePath(smovie.backdrop_path, "w500")}
                      whileHover="hover"
                      animate="normal"
                      key={smovie.id}
                    >
                      <Info variants={infoVarients}>
                        <h4>{smovie.title}</h4>
                      </Info>
                    </Box>
                  ))}
                </SimilerMovies>
              </SimilerMovieSection>
            </>
          )}
        </MovieDetailWrapper>
      ) : null}
    </>
  );
}
export default MovieDetail;
