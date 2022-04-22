import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITvsResult } from "../api";
import { selectedTv } from "../atom";
import { makeImagePath } from "../utils";

// Components
const SliderWrapper = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)<{ offset: number }>`
  display: grid;
  grid-template-columns: repeat(${(prop) => prop.offset}, 1fr);
  gap: 5px;
  margin-bottom: 10px;
  position: absolute;
  width: 100%;
`;
const Title = styled.h1`
  position: absolute;
  font-size: 35px;
  color: ${(props) => props.theme.white.darker};
  left: 60px;
  top: -50px;
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
  &:last-child {
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
const LeftBtn = styled(motion.div)`
  width: 60px;
  z-index: 10;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const RightBtn = styled(motion.div)`
  width: 60px;
  z-index: 10;
  height: 200px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Leftsvg = styled(motion.svg)`
  width: 100px;
  height: 100px;
  top: 60px;
  left: 1px;
  z-index: 10;
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
const rowVariants = {
  hidden: (back: boolean) => ({
    x: back ? -window.outerWidth - 5 : window.outerWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
};

//interface
interface ISliderProp {
  data: ITvsResult;
  title: string;
}

//etc..

function TvSlider({ data, title }: ISliderProp) {
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);
  const [back, setBack] = useState(false);
  const [offset, setOffset] = useState(6);
  const setTv = useSetRecoilState(selectedTv);
  const hasPosterResults = data?.results?.filter(
    (tv) => tv.backdrop_path !== null
  );
  const resizingHandler = () => {
    if (window.innerWidth <= 1024) {
      setOffset(4);
    } else {
      setOffset(6);
    }
  };
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setOffset(4);
    }

    window.addEventListener("resize", resizingHandler);
    return () => {
      window.removeEventListener("resize", resizingHandler);
    };
  }, []);

  const navigate = useNavigate();
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      setBack(false);
      setLeaving(true);
      const totalTvs = data.results.length - 1;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      setBack(true);
      setLeaving(true);
      const totalTvs = data.results.length - 1;
      const maxIndex = Math.floor(totalTvs / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const onBoxClick = (tvId: number) => {
    navigate(`/tv/${tvId}`);
    setTv({ title, tvId });
  };

  return (
    <SliderWrapper>
      <Title>{title}</Title>
      <LeftBtn onClick={increaseIndex}>
        <Leftsvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
          <motion.path
            d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"
            fill="rgba(256,256,256,0.4)"
          ></motion.path>
        </Leftsvg>
      </LeftBtn>
      <AnimatePresence
        initial={false}
        custom={back}
        onExitComplete={toggleLeaving}
      >
        <Row
          offset={offset}
          custom={back}
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={title + index}
        >
          {hasPosterResults
            ? hasPosterResults
                .slice(offset * index, offset * index + offset)
                .map((tv) => (
                  <Box
                    layoutId={title + tv.id}
                    key={title + tv.id}
                    bgphoto={makeImagePath(tv.backdrop_path ?? "", "w500")}
                    variants={BoxVariants}
                    whileHover="hover"
                    onClick={() => onBoxClick(tv.id)}
                    initial="normal"
                  >
                    <Info variants={infoVarients}>
                      <h4>{tv.name}</h4>
                    </Info>
                  </Box>
                ))
            : null}
        </Row>
      </AnimatePresence>
      <RightBtn onClick={decreaseIndex}>
        <Leftsvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
          <motion.path
            d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
            fill="rgba(256,256,256,0.4)"
          ></motion.path>
        </Leftsvg>
      </RightBtn>
    </SliderWrapper>
  );
}

export default TvSlider;
