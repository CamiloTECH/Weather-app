import { useSelector } from "react-redux";
import Cards from "./Cards"

interface State {
  citys: [];
  cityDetail: {};
  user: {};
  statusFavorites: {};
  statusLogin: {};
}
function Home() {
  const { citys } = useSelector((state: State) => state);
  
  return <div>
    {citys.length>0 
      ? <Cards citys={citys}/>
      :null
    }
  </div>;
}

export default Home;
