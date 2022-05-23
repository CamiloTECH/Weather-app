import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import SearchBar from "./components/SerchBar";
import Details from "./components/Details";

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Landing key={"landing"} />} />
      
      <Route
        path="/home"
        element={[<SearchBar key={"SearchBar"} />, <Home key={"home"} />]}
      />

      <Route
        path="/home/details/:name"
        element={[<SearchBar key={"SearchBar"} />, <Details key={"details"} />]}
      />
      
    </Routes>
  );
}

export default App;
