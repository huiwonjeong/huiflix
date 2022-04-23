import { motion } from "framer-motion";
import styled from "styled-components";
import { IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const MovieWrapper = styled.div`
  margin-top: 120px;
  padding-bottom: 180px;
  height: 100%;
`;
const Title = styled.h1`
  font-size: 35px;
  color: ${(props) => props.theme.white.darker};
  padding-left: 20px;
`;
const Grid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:nth-child(6n + 1) {
    transform-origin: center left;
  }
  &:nth-child(6n) {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 20px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
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

interface MovieGridProp {
  data: IGetMoviesResult;
}

function MovieGrid({ data }: MovieGridProp) {
  const hasPosterResults = data?.results?.filter(
    (movie) => movie.backdrop_path !== null || movie.poster_path !== null
  );
  return (
    <MovieWrapper>
      <Title>Movie</Title>
      {data ? (
        <Grid>
          {hasPosterResults?.map((movie, index) => (
            <Box
              bgphoto={makeImagePath(
                movie.backdrop_path
                  ? movie.backdrop_path
                  : movie.poster_path
                  ? movie.poster_path
                  : ""
              )}
              key={movie.id}
              variants={BoxVariants}
              whileHover="hover"
              initial="normal"
            >
              <Info variants={infoVarients}>
                <h4>{movie.title}</h4>
              </Info>
            </Box>
          ))}
        </Grid>
      ) : null}
    </MovieWrapper>
  );
}
export default MovieGrid;
