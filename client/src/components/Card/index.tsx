import "./Card.css";

import { FC } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import getToken from "../../accessibility";
import {
  addFavorites,
  clearCityDetail,
  clearCitys,
  deleteCity,
  deleteFavorites,
  getCity
} from "../../redux/actions";
import { CHANGE_STATUS_FAV } from "../../redux/actionTypes";

interface Props {
  id: number;
  name: string;
  logo: string;
  description: string;
  weather: string;
  country: string;
  temperature: number;
  coord: { lon: number; lat: number };
  favorite: boolean;
}

const Card: FC<Props> = props => {
  const {
    id,
    coord,
    country,
    description,
    favorite,
    logo,
    name,
    temperature,
    weather
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const addFav = () => {
    const token = getToken();
    if (token) {
      dispatch(addFavorites(name, token)).then(({ payload }) => {
        if (payload?.error) {
          invalidUser();
        }
      });
      dispatch({ type: CHANGE_STATUS_FAV, payload: id });
    } else {
      invalidUser();
    }
  };

  const deleteFav = () => {
    const token = getToken();
    if (token) {
      dispatch(deleteFavorites(name, token)).then(({ payload }) => {
        if (payload?.error) {
          invalidUser();
        }
      });
      dispatch({ type: CHANGE_STATUS_FAV, payload: id });
    } else {
      invalidUser();
    }
  };

  const deleteCurrentCity = () => {
    const token = getToken();
    if (token) {
      dispatch(deleteCity(id));
      if (favorite) {
        dispatch(deleteFavorites(name, token)).then(({ payload }) => {
          if (payload?.error) {
            invalidUser();
          }
        });
      }
    } else {
      invalidUser();
    }
  };

  const refresState = () => {
    const token = getToken();
    token
      ? dispatch(getCity(name, token, true)).then(({ payload }) => {
          if (payload?.error) {
            invalidUser();
          }
        })
      : invalidUser();
  };

  return (
    <div className="card p-2 shadow-lg bg-light" style={{ width: "20rem" }}>
      <div className="p-0 m-0 d-flex justify-content-between">
        <button
          className="p-0 m-0 bg-transparent border-0 status"
          title="Update status"
          onClick={refresState}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            className="bi bi-arrow-clockwise logos"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
          </svg>
        </button>
        <button
          className="p-0 m-0 bg-transparent border-0"
          title="Delete"
          onClick={deleteCurrentCity}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            className="bi bi-x-square-fill logos"
            viewBox="0 0 16 16"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
          </svg>{" "}
        </button>
      </div>

      <div className="w-100 d-flex justify-content-center">
        <img
          src={`http://openweathermap.org/img/wn/${logo}@2x.png`}
          className="card-img-top w-50 img"
          alt="Logo"
        />
      </div>

      <div className="card-body p-0">
        <h5 className="card-title text-center fs-4 fw-bold mb-3">
          {name} - {country}
        </h5>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Status: </strong>
          {description}
        </li>
        <li className="list-group-item">
          <strong>Weather: </strong>
          {weather}
        </li>
        <li className="list-group-item">
          <strong>Temperature: </strong>
          {temperature} °C
        </li>
      </ul>

      <div className="card-body d-flex justify-content-between px-0 pb-0">
        <Link
          to={`/home/details/${name}?lat=${coord.lat}&lon=${coord.lon}`}
          className="btn btn-info fw-bold"
        >
          See more details
        </Link>

        <button
          className="p-0 m-0 bg-transparent border-0"
          title={favorite ? "Delete to favorite" : "Add to favorite"}
          onClick={favorite ? deleteFav : addFav}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            className={`bi bi-heart-fill animate__animated ${
              favorite ? "fav animate__heartBeat" : "logos animate__pulse"
            } `}
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Card;
