import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import LandingPage from "./Pages/LandingPage/LandingPage";

function App() {
  return (
    <BrowserRouter>
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
