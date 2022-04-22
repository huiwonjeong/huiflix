import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Header />
        <Routes>
          <Route path="/tv" element={<Tv />}>
            <Route path="/tv/:id" element={<Tv />} />
          </Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/" element={<Home />}>
            <Route path="movies/:id" element={<Home />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </RecoilRoot>
  );
}

export default App;
