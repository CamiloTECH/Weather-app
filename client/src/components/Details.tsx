import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  changeGeneralError,
  getCityDetails,
  clearCityDetail,
} from "../redux/action";
import Swal from "sweetalert2";

interface State {
  citys: [];
  cityDetail: any;
  user: {};
  statusFavorites: {};
  statusLogin: {};
  loading: { status: boolean; component: string };
  generalError: boolean;
}

function Details() {
  const { cityDetail, loading, generalError } = useSelector(
    (state: State) => state
  );
  const { name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const lat = query.get("lat");
  const lon = query.get("lon");

  useEffect((): any => {
    if (lat && lon) dispatch(getCityDetails(lat, lon));
    else navigate("/home");

    return () => dispatch(clearCityDetail());
  }, []);

  useEffect(() => {
    if (generalError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The city was not found! Check that the coordinates are correct",
      }).then(() => {
        dispatch(changeGeneralError(false));
        navigate("/home");
      });
    }
  }, [generalError]);

  console.log(cityDetail);
  return (
    <div>
      {loading.status && loading.component === "detail" ? (
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
      ) : cityDetail.lat && (
        <div className="container">
          <div className="row p-2 bg-secondary">
            <div className="col-12">
              <h1 className="">{name}</h1>
              <h1 className="">{cityDetail.current.dt}</h1>
            </div>

            <div className="col-12">
              <div className="d-flex align-items-center">
                <img
                  src={`http://openweathermap.org/img/wn/${cityDetail.current.weather[0].icon}@2x.png`}
                  className="card-img-top w-25 imagen"
                  alt="Logo"
                />
                <h1>{cityDetail.current.temp}</h1>
              </div>
              
              <div></div>
            </div>

            <div className="col-12"></div>
          </div>

          <div className="row"></div>
        </div>
      )}
    </div>
  );
}

export default Details;
