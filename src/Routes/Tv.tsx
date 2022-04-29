import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getOnTheAirTv,
  getTopRatedTv,
  getTvRecommandationsWithId,
  ITvsResult,
} from "../api";
import { makeImagePath } from "../utils";
import { useMatch, useNavigate } from "react-router-dom";
import TvSlider from "../Components/TvSlider";
import TvDetail from "../Components/TvDetail";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useRecoilState } from "recoil";
import { selectedTv } from "../atom";

const Wrapper = styled.div`
  background-color: black;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
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

const TvDetailWindow = styled(motion.div)`
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

function Tv() {
  const tvDetailMatch = useMatch("/huiflix/tv/:tvId");
  const { scrollY } = useViewportScroll();

  const { data: onTheAir, isLoading: onTheAirLoading } = useQuery<ITvsResult>(
    ["tv", "onTheAir"],
    getOnTheAirTv
  );
  const { data: topRated, isLoading: popularLoading } = useQuery<ITvsResult>(
    ["tv", "topRated"],
    getTopRatedTv
  );
  const { data: recommandations, isLoading: RecommandationsLoading } = useQuery(
    ["tv", "recommandations"],
    () => getTvRecommandationsWithId(92749)
  );

  const [tvInfo, setTv] = useRecoilState(selectedTv);

  const navigate = useNavigate();
  const onOverlayClick = () => {
    navigate("/huiflix/tv");
    setTv({ title: "", tvId: 0 });
  };
  return (
    <Wrapper>
      {onTheAirLoading && popularLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(onTheAir?.results[0].backdrop_path || "")}
          >
            <Title>{onTheAir?.results[0].name}</Title>
            <Overview>{onTheAir?.results[0].overview}</Overview>
          </Banner>
          <SliderWrapper>
            {onTheAir ? <TvSlider title="On The Air" data={onTheAir} /> : null}
          </SliderWrapper>
          <SliderWrapper>
            {topRated ? <TvSlider title="Top Rated" data={topRated} /> : null}
          </SliderWrapper>
          <SliderWrapper>
            {recommandations ? (
              <TvSlider title="Recommandations" data={recommandations} />
            ) : null}
          </SliderWrapper>
          {tvDetailMatch && tvInfo.tvId !== 0 ? (
            <AnimatePresence>
              <Overlay
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "tween", duration: 0.5 }}
                onClick={onOverlayClick}
              />
              {tvInfo.tvId !== 0 ? (
                <TvDetailWindow
                  layoutId={tvInfo.title + tvInfo.tvId}
                  style={{ top: scrollY.get() + 100 }}
                  key={tvInfo.tvId}
                >
                  <TvDetail />
                </TvDetailWindow>
              ) : null}
            </AnimatePresence>
          ) : null}
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
