import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import SearchBar from "./components/SerchBar";
import Details from "./components/Details";
import NotFound from "./components/NotFound";

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
