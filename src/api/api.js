const BASE_URL= 'https://swapi.dev/api';

export const fetchSwapi = async (endpoint, query = '') => {
    const url = query 
      ? `${BASE_URL}/${endpoint}/?search=${query}` //endpoint es lo que queremos consultar por ejemplo people, films.. el query es para la busqueda si hay un query solo incluye lo que queremos buscar
      : `${BASE_URL}/${endpoint}/`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data from SWAPI:", error);
      return null;
    }
  };

