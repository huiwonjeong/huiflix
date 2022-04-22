import { atom } from "recoil";

export interface ISelectedMovieProp {
  title: string;
  movieId: number;
}

export const selectedMovie = atom({
  key: "selectedMovie",
  default: { title: "", movieId: 0 },
});

export const selectedTv = atom({
  key: "selectedTv",
  default: { title: "", tvId: 0 },
});
