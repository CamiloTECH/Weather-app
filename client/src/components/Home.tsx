import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "./Cards"
import Swal from "sweetalert2"
import { changeGeneralError } from "../redux/action";

interface State {
  citys: any;
  cityDetail: {};
  statusFavorites: {};
  statusLogin: { status: boolean; token?: string };
  statusRegister: { status: boolean };
  loading: { status: boolean; component: string };
  generalError: boolean;
}

function Home() {
  const { citys, generalError } = useSelector((state: State) => state);
  const dispatch=useDispatch()
 
  useEffect(()=>{
    if(generalError){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "The city was not found! Check that the name is correct",
      }).then(()=>dispatch(changeGeneralError(false)))
    }
  },[generalError])

  return <>
    {citys.length>0
      ? <Cards citys={citys}/>
      : <h1 className="text-center text-white mt-5">Search your favorite city to know its weather</h1>
    }
  </>;
}

export default Home;
