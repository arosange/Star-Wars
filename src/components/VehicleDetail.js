import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { Link } from "react-router-dom";


function VehicleDetail() {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    const imageSrc = `/assets/images/vehicles/${id}.png`;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);  

            try {
                const vehicleResponse = await fetch(`https://swapi.dev/api/vehicles/${id}`);
                
                const vehicleData = await vehicleResponse.json();
                setVehicle(vehicleData);

                // buscar peliculas
                const filmsResponses = await Promise.all(
                    vehicleData.films.map(url => fetch(url).then(res => res.json()))
                );
                setFilms(filmsResponses);

            } catch (error) {
                console.error("Error fetching vehicle data:", error);
                setVehicle(null);  
            } finally {
                setLoading(false);  
            }
        };

        fetchData();
    }, [id]);  

    if (loading) return <img src="/assets/gif/loading.gif" alt="loading" className="loadingGif"/>;

    

    return (
        <div className="item-detail">
            <h2>{vehicle.name}</h2>
            <div className="item-info">
            <img src={imageSrc} alt="vehicle.name"/>
            <div>
            <p>Model: {vehicle.model}</p>
            <p>Vehicle Class: {vehicle.vehicle_class}</p>
            <p>Length: {vehicle.length}</p>
            <p>Manufacturer: {vehicle.manufacturer}</p>
            <p>Maximum Atmosphering Speed: {vehicle.max_atmosphering_speed}</p>
            <p>Cargo Capacity: {vehicle.cargo_capacity}</p>
            </div>
            </div>



            <h2>Films:</h2>
            
            <div className="related">

            {films.map(film => {
                    const parts = film.url.split("/");  // Extraer el ID desde la URL
                    const filmId = parts[parts.length - 2]; // Obtener el ID de la película
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
        </div>
    );
}

export default VehicleDetail;
