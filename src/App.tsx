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
          <Route path="/huiflix/tv" element={<Tv />}>
            <Route path="/huiflix/tv/:id" element={<Tv />} />
          </Route>
          <Route path="/huiflix/search" element={<Search />}></Route>
          <Route path="/huiflix/" element={<Home />}>
            <Route path="/huiflixmovies/:id" element={<Home />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </RecoilRoot>
  );
}

export default App;
