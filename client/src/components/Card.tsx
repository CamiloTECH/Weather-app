import { useDispatch } from "react-redux";
import "../Css/Card.css";

function Card({
  name,
  logo,
  description,
  weather,
  country,
  temperature,
  coord,
}: {
  name: String;
  logo: String;
  description: String;
  weather: String;
  country: String;
  temperature: number;
  coord: { lon: number; lat: number };
}) {
  const dispatch = useDispatch();


  return (
    <div className="card p-2 shadow-lg bg-light" style={{ width: "20rem" }}>
      <div className="p-0 m-0 text-end">
        <button className="p-0 m-0 bg-transparent border-0" title="Delete">
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
          className="card-img-top w-50 imagen"
          alt="Logo"
        />
      </div>

      <div className="card-body p-0">
        <h5 className="card-title text-center fs-4 fw-bold mb-3">
          {name} - {country}
        </h5>
        <p className="card-text px-3 py-2">
          <strong>Status: </strong>
          {description.toUpperCase()}
        </p>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <strong>Weahter: </strong>
          {weather}
        </li>
        <li className="list-group-item">
          <strong>Temperature: </strong>
          {temperature} °C
        </li>
      </ul>

      <div className="card-body d-flex justify-content-between">
        <button className="btn btn-info fw-bold">See more details</button>
        <button
          className="p-0 m-0 bg-transparent border-0"
          title="Add to favorite"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            className="bi bi-heart-fill logos"
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
}

export default Card;
