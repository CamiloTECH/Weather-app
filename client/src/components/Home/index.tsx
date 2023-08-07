import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import getToken from "../../accessibility";
import { ReducerState } from "../../models";
import { getFavorites, loadCitysLocalstorage } from "../../redux/actions";
import Cards from "../Cards";

function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const citys = useSelector((state: ReducerState) => state.citys);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const citysLocalStorage = window.localStorage.getItem("citys");
      if (citysLocalStorage) {
        if (citys.length === 0) {
          dispatch(loadCitysLocalstorage(JSON.parse(citysLocalStorage)));
        }
      } else {
        setLoading(true);
        dispatch(getFavorites(token)).finally(() => setLoading(false));
      }
    }
  }, []);

  return (
    <>
      {loading ? (
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
