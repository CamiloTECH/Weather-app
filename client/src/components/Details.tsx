import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  changeGeneralError,
  getCityDetails,
  clearCityDetail,
} from "../redux/action";
import "../Css/Detail.css"
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

  const unixTimeNormalDate = (unix: number, short: boolean): string => {
    const milliseconds = unix * 1000;
    const dateObject = new Date(milliseconds);
    const weekday = dateObject.toLocaleString("en-US", { weekday: "short" });
    const dayNumber = dateObject.toLocaleString("en-US", { day: "numeric" });
    const month = dateObject.toLocaleString("en-US", { month: "short" });
    const hourt = dateObject.toLocaleString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });

    return short ? hourt : `${weekday}.,${dayNumber} of ${month} ${hourt}`;
  };
  console.log(cityDetail);
  return (
    <>
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
      ) : (
        cityDetail.lat && (
          <div className="container my-5 py-2" >
            <div className="row">
              <div
                className="col-6 p-3 bg-black bg-opacity-75 shadow-lg"
                style={{ borderRadius: "25px" }}
              >
                <div className="col-12 text-white">
                  <h1 className="">{name}</h1>
                  <h1 className="fs-2">
                    {unixTimeNormalDate(cityDetail.current.dt, false)}
                  </h1>
                </div>
                <hr className="text-white" />
                <div className="col-12 row" style={{ color: "#D0D3D4" }}>
                  <div className="col d-flex align-items-center p-0">
                    <img
                      src={`http://openweathermap.org/img/wn/${cityDetail.current.weather[0].icon}@2x.png`}
                      className="card-img-top"
                      style={{ filter: "drop-shadow(0px 0px 25px #0dcaf0)" }}
                      alt="Logo"
                    />
                    <h1 style={{ fontSize: "4rem" }}>
                      {cityDetail.current.temp}°
                    </h1>
                  </div>

                  <div className="col-5 p-0 text-end d-flex flex-column justify-content-center">
                    <p className="fs-3 text-capitalize fw-bold p-0 m-0">
                      {cityDetail.current.weather[0].description}
                    </p>
                    <p className="fs-3 fw-bold p-0 m-0">
                      {cityDetail.current.dew_point}° /{" "}
                      {cityDetail.current.feels_like}°
                    </p>
                    <p className="fs-3 fw-bold p-0 m-0">
                      Humidity {cityDetail.current.humidity}%
                    </p>
                  </div>
                </div>
                <hr className="rounded rounded-3 bg-info p-1" />

                <div className="col-12 d-flex gap-3 text-white w-100 mt-4 pb-3 scroll" style={{overflowX:"scroll"}}>
                  {cityDetail.hourly.map((hora: any, index: number) => (
                    
                    <div key={index} className="w-100">
                      <p className="m-0 text-center fw-bold fs-5">
                        {unixTimeNormalDate(hora.dt, true)}
                      </p>
                      <img
                        src={`http://openweathermap.org/img/wn/${hora.weather[0].icon}@2x.png`}
                        style={{ filter: "drop-shadow(1px 1px 10px #ffFFFF)" }}
                        alt="Logo"
                      />
                      
                      <div className="d-flex justify-content-center gap-2">
                        <i className="bi bi-thermometer-half text-warning"></i>
                        <p className="text-center m-0 fs-6">{hora.temp}°</p>
                      </div>
                      <div className="d-flex justify-content-center gap-2">
                        <i className="bi bi-droplet-half text-primary"></i>
                        <p className="text-center m-0">{hora.humidity} %</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col">
                <h1>hola</h1>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default Details;
