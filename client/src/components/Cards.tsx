import Card from "./Card";

function Cards({ citys }: { citys: [] }) {

  return (
    <div className="container d-flex flex-wrap justify-content-center align-items-center gap-5 my-5">
      {citys.map((city:any)=>(
        <Card 
        key={city.id}
        name={city.name} 
        logo={city.weather[0].icon} 
        description={city.weather[0].description}
        weather={city.weather[0].main}
        country={city.sys.country}
        temperature={city.main.temp}
        coord={city.coord}
        />
        ))}
    </div>
  );
}

export default Cards;
