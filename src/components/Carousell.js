
import React from "react";
import "./Carousel.css"
import { Link } from "react-router-dom";

const Carousel = ({ items, title, className }) => {


    return (
        <div className={`carousel ${className || ""}`}> 
            <h2>{title}</h2>
            <div className="carousel-items">
                {items.map((item) => {
                    // Extraer el id del url 
                    const parts = (item.url || "").split("/");
                    const id = parts[parts.length - 2];


                    //Se tuvo que hacer este category porque sino en las busquedas generaba el link incorrecto como /details/search results/1. que no cargaba las imagenes ya que antes se usaba el title
                    const category = item.url.includes("films")
                            ? "films"
                            : item.url.includes("people")
                            ? "people"
                            : "vehicles";


                    const imageSrc = `/assets/images/${category}/${id}.png`;



                    return (
                        <div key={id} className="carousel-item">
                            <Link to={`/details/${category}/${id}`}>
                                <img
                                    src={imageSrc}
                                    alt={item.name || item.title}
                                    className="carousel-image"
                                />
                                <div className="item-name">
                                <h3>{item.name || item.title}</h3>
                                </div>
                            </Link>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Carousel;

