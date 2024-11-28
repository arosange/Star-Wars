import React, { useState } from "react";
import { fetchSwapi } from "../api/api"; 

const SearchBar = ({ setSearchResults }) => {
  const [query, setQuery] = useState(""); //estado de la barra primero es vacio porque nadie ha ingresado datos 

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 1) {
      try {
        const [people, films, vehicles]= await Promise.all([
          fetchSwapi(`people`, searchQuery),
          fetchSwapi(`films` , searchQuery),
          fetchSwapi(`vehicles`, searchQuery),
        ]);

        // Combinar los resultados
        const combinedResults = [
          ...(people.results || []),
          ...(films.results || []),
          ...(vehicles.results || []),
        ];
      

        // Actualizar los resultados de búsqueda
        setSearchResults(combinedResults);
      } catch (error) {
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <input 
    type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Search the Jedi archives..."
      className="search-bar"
    />
  );
};

export default SearchBar;
