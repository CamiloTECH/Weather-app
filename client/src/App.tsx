import { Route, Routes } from "react-router-dom";

import Details from "./components/Details";
import Home from "./components/Home";
import Landing from "./components/Landing";
import NotFound from "./components/NotFound";
import SearchBar from "./components/SerchBar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing key={"landing"} />} />
      <Route path="/:token" element={<Landing key={"landing"} />} />

      <Route
        path="/home"
        element={[<SearchBar key={"SearchBar"} />, <Home key={"home"} />]}
      />

      <Route
        path="/home/details/:name"
        element={[<SearchBar key={"SearchBar"} />, <Details key={"details"} />]}
      />

      <Route path="*" element={<NotFound key={"NotFound"} />} />
    </Routes>
  );
}

export default App;
