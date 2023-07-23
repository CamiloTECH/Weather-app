import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReducerState } from "../../models";
import { getFavorites, loadCitysLocalstorage } from "../../redux/actions";
import Cards from "../Cards";

function Home() {
  const { citys, loading } = useSelector((state: ReducerState) => state);
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const citysLocalStorage = window.localStorage.getItem("citys");
      if (citysLocalStorage) {
        if (citys.length === 0) {
          dispatch(loadCitysLocalstorage(JSON.parse(citysLocalStorage)));
        }
      } else dispatch(getFavorites(token));
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
              borderWidth: "8px"
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
