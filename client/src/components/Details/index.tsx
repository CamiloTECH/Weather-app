import "./Detail.css";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import { token } from "../../accessibility";
import { DailyWeather, HourlyWeather, ReducerState } from "../../models";
import { clearCityDetail, getCityDetails } from "../../redux/actions";
import { unixTimeNormalDate, weekDay } from "./setTime";

function Details() {
  const { name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const cityDetail = useSelector((state: ReducerState) => state.cityDetail);
  const query = new URLSearchParams(location.search);
  const lat = query.get("lat");
  const lon = query.get("lon");

  const refresState = () => {
    if (token && lat && lon) {
      setLoading(true);
      dispatch(getCityDetails(lat, lon, token)).finally(() => {
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    if (!lat || !lon) {
      navigate("/home");
    } else {
      setLoading(true);
      dispatch(getCityDetails(lat, lon, token))
        .then(({ payload }) => {
          if (!payload?.lat) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "The city was not found! Check that the coordinates are correct"
            }).then(() => navigate("/home"));
          }
        })
        .finally(() => setLoading(false));
    }

    return () => {
      dispatch(clearCityDetail());
    };
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
      ) : (
        cityDetail &&
        cityDetail.lat && (
          <div className="container my-5 py-2">
            <div className="row justify-content-center gap-5 ">
              <div
                className="col-10 col-lg-6 p-3 bg-black bg-opacity-75 shadow-lg"
                style={{ borderRadius: "25px" }}
              >
                <div className="text-white">
                  <div className="d-flex justify-content-between">
                    <h1 className="">{name}</h1>
                    <button
                      className="p-0 m-0 me-1 bg-transparent border-0 status"
                      title="Update status"
                      onClick={refresState}
                    >
                      <i className="bi bi-arrow-clockwise refresh fs-1"></i>
                    </button>
                  </div>
                  <h1 className="fs-2">
                    {unixTimeNormalDate(cityDetail.current.dt, false)}
                  </h1>
                </div>

                <hr className="text-info" />

                <div className="row px-3" style={{ color: "#D0D3D4" }}>
                  <div className="col-md-6 col-lg-12 col-xl-6 d-flex flex-column flex-sm-row justify-content-center justify-content-xl-start align-items-center p-0 m-0">
                    <img
                      src={`http://openweathermap.org/img/wn/${cityDetail.current.weather[0].icon}@2x.png`}
                      className="col col-6 col-xl-6"
                      style={{ filter: "drop-shadow(0px 0px 8px #ffffff)" }}
                      alt="Logo"
                    />
                    <h1 className=" mb-4 m-sm-0 temp">
                      {cityDetail.current.temp}°
                    </h1>
                  </div>

                  <div className="col-md-6 col-lg-12 col-xl-6 p-0 text-center text-xl-end text-md-end text-lg-center d-flex flex-column justify-content-center">
                    <p className="fs-3 text-capitalize fw-bold p-0 m-0">
                      {cityDetail.current.weather[0].description}
                    </p>
                    <p className="fs-3 fw-bold p-0 m-0">
                      {cityDetail.current.feels_like}° /{" "}
                      {cityDetail.current.dew_point}°
                    </p>
                    <p className="fs-3 fw-bold p-0 m-0">
                      Humidity {cityDetail.current.humidity}%
                    </p>
                  </div>
                </div>
                <hr className="rounded rounded-3 bg-info p-1" />

                <div
                  className="col-12 d-flex gap-3 text-white w-100 mt-4 pb-3 scroll"
                  style={{ overflowX: "scroll" }}
                >
                  {cityDetail.hourly.map(
                    (hora: HourlyWeather, index: number) => (
                      <div key={index} className="w-100">
                        <p className="m-0 text-center fw-bold fs-5">
                          {unixTimeNormalDate(hora.dt, true)}
                        </p>
                        <img
                          src={`http://openweathermap.org/img/wn/${hora.weather[0].icon}@2x.png`}
                          style={{
                            filter: "drop-shadow(1px 1px 10px #ffFFFF)"
                          }}
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
                    )
                  )}
                </div>
              </div>

              <div
                className="col-10 col-lg-5 px-1 px-md-3 py-3 bg-black bg-opacity-75 shadow-lg"
                style={{ borderRadius: "25px" }}
              >
                {cityDetail.daily
                  .slice(1)
                  .map((day: DailyWeather, index: number) => (
                    <div key={day.dt}>
                      {index !== 0 && <hr className="text-info m-0 mb-2" />}
                      <div className="w-100 text-white-50 d-flex flex-column flex-sm-row align-items-center flex-lg-column flex-xl-row">
                        <p className="mb-2 ms-sm-3 m-sm-0  text-center text-xl-start text-lg-center text-sm-start  fw-bold text-white w-50 dia">
                          {weekDay(day.dt)}
                        </p>
                        <div className="d-flex align-items-center justify-content-evenly justify-content-md-evenly justify-content-xl-center gap-2 w-100">
                          <div className="d-flex gap-0 gap-sm-2">
                            <i className="bi bi-droplet-half text-primary"></i>
                            <p className="text-center m-0">{day.humidity}%</p>
                          </div>

                          <img
                            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                            className="imagen"
                            alt="Logo"
                          />
                          <div className="d-flex gap-0 gap-sm-2">
                            <i className="bi bi-thermometer-half text-warning  d-none d-sm-inline"></i>
                            <p className="text-center m-0 fs-6 text-white">
                              {day.temp.max}° / {day.temp.min}°
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default Details;
