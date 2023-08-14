import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import getToken from "../../accessibility";
import ReducerState from "../../models/ReduxTypes";
import {
  clearCityDetail,
  clearCitys,
  getFavorites,
  loadCitysLocalstorage
} from "../../redux/actions";
import Cards from "../Cards";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const citys = useSelector((state: ReducerState) => state.citys);

  const invalidUser = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid User"
    }).then(() => {
      dispatch(clearCitys());
      dispatch(clearCityDetail());
      navigate("/");
    });
  };

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
        dispatch(getFavorites(token))
          .then(({ payload }) => {
            if (payload?.error) {
              invalidUser();
            }
          })
          .finally(() => setLoading(false));
      }
    } else {
      navigate("/");
      dispatch(clearCitys());
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
