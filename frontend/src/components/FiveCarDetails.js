import React from "react";
import tyre2 from "../images/tyre2.png";
import { useCarContext } from "../hooks/useCarContext";

const FiveCarDetails = ({ car }) => {
  const currentYear = new Date().getFullYear();
  if (currentYear - car.year >= 5) {
    return (
      <div className="car-details" key={car._id}>
        <h4>
          <img className="tyre2" src={tyre2} />
          {car.make}
        </h4>
        <p>
          Model: <strong className="p">{car.model}</strong>
        </p>
        <p>Year of registration: {car.year}</p>
        <p>Registration plate: {car.registration}</p>
        <p>Current owner: {car.owner}</p>
      </div>
    );
  } else {
    return null;
  }
};
;

export default FiveCarDetails;
