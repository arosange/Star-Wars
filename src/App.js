import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Carousel from "./components/Carousell";
import NavBar from './components/Navbar';
import FilmDetail from "./components/FilmDetail";
import VehicleDetail from "./components/VehicleDetail";
import PeopleDetail from "./components/PeopleDetail";
import HomeBanner from "./components/HomeBanner";
import { fetchSwapi } from './api/api';
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); //se usa una dependencia para qufuncione cada vez que se cambie la ruta

  return null;
}

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [categories, setCategories] = useState({
    films: [],
    people: [],
    vehicles: [],
  });

  
  useEffect(() => {
    const loadSwapi = async () => {
      try {
        const filmsCategory = await fetchSwapi(`films/`);
        const peopleCategory = await fetchSwapi(`people/`);
        const vehiclesCategory = await fetchSwapi(`vehicles/`);

        setCategories({
          films: filmsCategory.results || [],
          people: peopleCategory.results || [],
          vehicles: vehiclesCategory.results || [],
        });
      } catch (error) {
        console.error("Error loading SWAPI categories:", error);
      }
    };

    loadSwapi();
  }, []);

  return (
    <Router>
      <ScrollToTop /> 
      <div className="App">
        <NavBar setSearchResults={setSearchResults} />
        <Routes>
          
          <Route
            path="/"
            element={
              searchResults.length > 0 ? (
                <Carousel items={searchResults} title="Search Results"  className="search-results-carousel" />
              ) : (
                <>
                  <HomeBanner/>
                  <Carousel items={categories.films} title="Films" />
                  <Carousel items={categories.people} title="People" />
                  <Carousel items={categories.vehicles} title="Vehicles" />
                </>
              )
            }
          />
          <Route path="/details/films/:id" element={<FilmDetail />} />
          <Route path="/details/people/:id" element={<PeopleDetail />} />
          <Route path="/details/vehicles/:id" element={<VehicleDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;