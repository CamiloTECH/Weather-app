import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "./Cards";
import { getFavorites } from "../redux/action";

interface State {
  citys: [];
  cityDetail: {};
  statusFavorites: {};
  statusLogin: { status: boolean | undefined; token?: string };
  statusRegister: { status: boolean | undefined };
  loading: { status: boolean; component: string };
  generalError: string;
}

function Home() {
  const { citys, loading,statusLogin } = useSelector((state: State) => state);
  const dispatch = useDispatch();
  const token=window.localStorage.getItem("token")

  useEffect(() => {
    if(token && !statusLogin.status){
      dispatch(getFavorites(token))
    }
  }, []);

  return (
    <>
      {loading.status && loading.component === "home" ? (
        <div className="text-center">
          <span
            className="spinner-border text-warning"
            style={{
              height: "100px",
              width: "100px",
              marginTop: "20vh",
              borderWidth: "8px",
            }}
            role="status"
          ></span>
        </div>
      ) : citys.length > 0 ? (
        <Cards citys={citys} />
      ) : (
        <h1 className="text-center text-white mt-5">
          Search your favorite city to know its weather
        </h1>
      )}
    </>
  );
}

export default Home;
