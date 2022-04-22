import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  getSimilerTvWithId,
  getTvCreditWithId,
  getTvSearchWithId,
  IClickedTv,
  IGetCast,
  IGetMoviesResult,
  ITvsResult,
} from "../api";
import { selectedMovie, selectedTv } from "../atom";
import { makeImagePath } from "../utils";

//Styled Components

const TvDetailWrapper = styled.div``;

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
const TvIcon = styled.svg`
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

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgphoto});
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

const SimilerTvSection = styled.div`
  padding: 10px;
  padding-top: 70px;
`;
const SimilerTvTitle = styled.div`
  color: ${(props) => props.theme.white.lighter};
  font-size: 36px;
  position: relative;
`;
const SimilerTvs = styled.div`
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

function TvDetail() {
  const tv = useRecoilValue(selectedTv);
  const { data: clickedTv, isLoading: clikedMovieLoading } =
    useQuery<IClickedTv>(["movie", tv.tvId + ""], () =>
      getTvSearchWithId(tv.tvId)
    );
  const { data: tvCredit, isLoading: movieCreditLoading } = useQuery<IGetCast>(
    ["movie", tv.tvId + " credit"],
    () => getTvCreditWithId(tv.tvId)
  );
  const { data: similerMovie, isLoading: similerMovieLoading } =
    useQuery<ITvsResult>(["movie", tv.tvId + " similer"], () =>
      getSimilerTvWithId(tv.tvId)
    );
  console.log(similerMovie);

  return (
    <>
      {clickedTv && tvCredit && similerMovie ? (
        <TvDetailWrapper>
          {clickedTv && (
            <>
              <DetailCover
                style={{
                  backgroundImage: `linear-gradient(to top,black, transparent), url(${makeImagePath(
                    clickedTv.backdrop_path,
                    "w500"
                  )})`,
                }}
              />
              <DetailTitle>{clickedTv.name}</DetailTitle>
              <MovieInfoFirstSection>
                <TimeInfo>
                  <DetailYear>
                    {new Date(clickedTv.first_air_date).getFullYear()}
                  </DetailYear>
                  <TvIcon
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path
                      d="M512 448H127.1C110.3 448 96 462.3 96 479.1S110.3 512 127.1 512h384C529.7 512 544 497.7 544 480S529.7 448 512 448zM592 0h-544C21.5 0 0 21.5 0 48v320C0 394.5 21.5 416 48 416h544c26.5 0 48-21.5 48-48v-320C640 21.5 618.5 0 592 0zM576 352H64v-288h512V352z"
                      fill="#e74c3c"
                    />
                  </TvIcon>
                  <RunTime>
                    {clickedTv.number_of_seasons} season
                    {clickedTv.number_of_seasons > 1 ? "s" : ""}
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
                  {clickedTv.vote_average.toFixed(1)}
                </Score>
              </MovieInfoFirstSection>
              <MovieInfoSecondSection>
                <Genres>
                  Genres:
                  {clickedTv.genres.map((item: IGenreProp, index: number) => (
                    <Genre>
                      {item.name}
                      {index !== clickedTv.genres.length - 1 ? ", " : null}
                    </Genre>
                  ))}
                </Genres>
                {tvCredit.cast.length !== 0 ? (
                  <Casts>
                    Cast:
                    {tvCredit.cast
                      .slice(0, 3)
                      .map((item: IGenreProp, index: number) => (
                        <Cast>
                          {item.name}
                          {index !== 2 ? ", " : null}
                        </Cast>
                      ))}
                  </Casts>
                ) : null}
              </MovieInfoSecondSection>
              <DetailOverview>{clickedTv.overview}</DetailOverview>

              <SimilerTvSection>
                <SimilerTvTitle>Similer Shows</SimilerTvTitle>
                <SimilerTvs>
                  {similerMovie.results.slice(0, 6).map((sTv) => (
                    <Box
                      variants={BoxVariants}
                      bgphoto={makeImagePath(sTv.backdrop_path ?? "", "w500")}
                      whileHover="hover"
                      animate="normal"
                      key={sTv.id}
                    >
                      <Info variants={infoVarients}>
                        <h4>{sTv.name}</h4>
                      </Info>
                    </Box>
                  ))}
                </SimilerTvs>
              </SimilerTvSection>
            </>
          )}
        </TvDetailWrapper>
      ) : null}
    </>
  );
}
export default TvDetail;
