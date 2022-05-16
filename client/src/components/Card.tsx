import { useDispatch } from "react-redux";

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
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={`http://openweathermap.org/img/wn/${logo}@2x.png`}
        className="card-img-top w-50"
        alt="Logo"
      />
      <div className="card-body">
        <h5 className="card-title">{name} - {country}</h5>
        <p className="card-text">
          {description}
        </p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{weather}</li>
        <li className="list-group-item">{temperature}</li>
      </ul>
      <div className="card-body">
        <button className="btn btn-info">
          See more details
        </button>
      </div>
    </div>
  );
}

export default Card;
