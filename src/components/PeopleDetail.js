import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; //parametros dinamicos de la URL como id o category
import { Link } from "react-router-dom";


function PeopleDetail() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [films, setFilms] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const imageSrc = `/assets/images/people/${id}.png`;
 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 

      try {
    
        const personResponse = await fetch(`https://swapi.dev/api/people/${id}/`);
        
        const personData = await personResponse.json();
        setPerson(personData);

        // buscar peliculas
        const filmsResponses = await Promise.all(
          personData.films.map(url => fetch(url).then(res => res.json()))
        );
        setFilms(filmsResponses);

        //personData.vehicles son los urls de los vehiculos 
        //.json() lo covierte a js 

        // buscar vehicles
        const vehiclesResponses = await Promise.all(
          personData.vehicles.map(url => fetch(url).then(res => res.json()))
        );
        setVehicles(vehiclesResponses);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching person data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <img src="/assets/gif/loading.gif" alt="loading" className="loadingGif"/>;



  return (
    <div className="item-detail">
      <h2>{person.name}</h2>
      <div className="item-info">
      <img src={imageSrc} alt={person.name}/>
     <div>
      <p>Gender: {person.gender}</p>
      <p>Birth Year: {person.birth_year}</p>
      <p>Height: {person.height} cm</p>
      <p>Mass: {person.mass} kg</p>
      </div>
      </div>

      <h2>Films</h2>
      
      <div className="related">
        {films.map((film) => {
          const parts = film.url.split("/");
          const filmId = parts[parts.length - 2]; 
          const filmImageSrc = `/assets/images/films/${filmId}.png`
          return (
            <div key={film.url} className="related-card">
              <Link to={`/details/films/${filmId}`}>
              <img src={filmImageSrc} alt={film.title}/>
              <div className="related-card-name"> 
              <h3>{film.title}</h3>
            </div>
            </Link>
            </div>
          );
        })}
        </div>
    

      {/*&& el and va a leer la condicion si es true ejecuta y sino seria false es decir no rednderiza*/ }
      {vehicles.length > 0 && (
        <>
          <h2>Vehicles</h2>
          <div className="related">
         
            {vehicles.map((vehicle) => {
              const parts = vehicle.url.split("/");
              const vehicleId = parts[parts.length - 2]; // Extraer el ID desde la URL
              const vehicleImageSrc = `/assets/images/vehicles/${vehicleId}.png`;
              return (
                <div key={vehicle.url} className="related-card">
                  <Link to={`/details/vehicles/${vehicleId}`}>
                  <img src={vehicleImageSrc} alt={vehicle.name}/>
                  <div className="related-card-name"> 
                  <h3>{vehicle.name}</h3>
                </div>
                </Link>
                </div>
              );
              
            })}
        </div>
        </>
        
      )}
    </div>
  );
}

export default PeopleDetail;
