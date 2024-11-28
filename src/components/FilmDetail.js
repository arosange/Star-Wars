import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { Link } from "react-router-dom";
import "./Detail.css"

function FilmDetail() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const imageSrc = `/assets/images/films/${id}.png`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 

      try {
        
        const filmResponse = await fetch(`https://swapi.dev/api/films/${id}/`);
        const filmData = await filmResponse.json();
        setFilm(filmData);

        const charactersResponses = await Promise.all(
          filmData.characters.map(url => fetch(url).then(res => res.json()))
        );
        setCharacters(charactersResponses);

        const vehiclesResponses = await Promise.all(
          filmData.vehicles.map(url => fetch(url).then(res => res.json()))
        );
        setVehicles(vehiclesResponses);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching film data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <img src="/assets/gif/loading.gif" alt="loading" className="loadingGif"/>;


  return (
    <div className="item-detail">
      <h2>{film.title}</h2>
      <div className="item-info">
      <img src={imageSrc} alt={film.title}/>
      <div className="item-text">
      <p>{film.opening_crawl}</p>
      <p>Release Date: {film.release_date}</p>
      <p>Director: {film.director}</p>
      </div>
      </div>

      

      <h2>Characters</h2>
      <div className="related">
      
        {characters.map((character) => {
          const parts = character.url.split("/");
          const characterId = parts[parts.length - 2];
          const characterImageSrc = `/assets/images/people/${characterId}.png`

          return (
            <div key={character.url} className="related-card">
              <Link to={`/details/people/${characterId}`}>
              <img src={characterImageSrc} alt={character.name}/>
              <div className="related-card-name">
              <h3>{character.name}</h3>
            </div>
            </Link>
            </div>
          );
        })}
</div>
    <h2>Vehicles</h2>

      <div className="related">
      
        {vehicles.map((vehicle) => {
          const parts = vehicle.url.split("/");
          const vehicleId = parts[parts.length - 2]; 
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
    </div>
  
  );
}


export default FilmDetail;
