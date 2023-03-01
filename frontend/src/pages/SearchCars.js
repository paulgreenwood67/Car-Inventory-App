import { useEffect, useState } from "react";
import { useCarContext } from "../hooks/useCarContext";



//components
import FiveCarDetails from "../components/FiveCarDetails";


const SearchCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("/api/cars")
      .then((response) => response.json())
      .then((data) => setCars(data));
  }, []);

  return (
    <div className="home">
      <div className="cars">
        <h2>Cars over five years old</h2>
        {cars.map((car) => <FiveCarDetails key={car._id} car={car} />)}
      </div>
    </div>
  );
};

export default SearchCars;
