import { useState } from "react";
import { useCarContext } from "../hooks/useCarContext";

const CarForm = () => {
  const { dispatch } = useCarContext();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [registration, setRegistration] = useState("");
  const [owner, setOwner] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const car = { make, model, year, registration, owner };

    const response = await fetch("/api/cars", {
      method: "POST",
      body: JSON.stringify(car),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setMake("");
      setModel("");
      setYear("");
      setRegistration("");
      setOwner("");
      setError(null);
      setEmptyFields([]);
      console.log("new car added", json);
      dispatch({ type: "CREATE_CAR", payload: json });
    }
  };

  const handleUpdateAll = (e) => {
    const updateAllCars = { make, model, year, registration, owner };

    e.preventDefault();
    fetch("/api/cars/updateAll", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updateAllCars),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`Updated all cars`);
      });
  };

  return (
    <>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add car</h3>

        <input
          type="text"
          onChange={(e) => setMake(e.target.value)}
          value={make}
          className={emptyFields.includes("make") ? "error" : ""}
          placeholder="Make"
        />

        <input
          type="text"
          onChange={(e) => setModel(e.target.value)}
          value={model}
          className={emptyFields.includes("model") ? "error" : ""}
          placeholder="Model"
        />

        <input
          type="number"
          onChange={(e) => setYear(e.target.value)}
          value={year}
          className={emptyFields.includes("year") ? "error" : ""}
          placeholder="Year of registration"
        />

        <input
          type="text"
          onChange={(e) => setRegistration(e.target.value)}
          value={registration}
          className={emptyFields.includes("registration") ? "error" : ""}
          placeholder="Registration plate"
        />

        <input
          type="text"
          onChange={(e) => setOwner(e.target.value)}
          value={owner}
          className={emptyFields.includes("owner") ? "error" : ""}
          placeholder="Current owner"
        />

        <button>Add</button>
        {error && <div className="error">{error}</div>}
      
      
      
      </form>
      <form onSubmit={handleUpdateAll}>
        <h3>Edit all</h3>

        <input
          type="text"
          onChange={(e) => setMake(e.target.value)}
          value={make}
          className={emptyFields.includes("make") ? "error" : ""}
          placeholder="Make"
        />

        <input
          type="text"
          onChange={(e) => setModel(e.target.value)}
          value={model}
          className={emptyFields.includes("model") ? "error" : ""}
          placeholder="Model"
        />

        <input
          type="number"
          onChange={(e) => setYear(e.target.value)}
          value={year}
          className={emptyFields.includes("year") ? "error" : ""}
          placeholder="Year of registration"
        />

        <input
          type="text"
          onChange={(e) => setRegistration(e.target.value)}
          value={registration}
          className={emptyFields.includes("registration") ? "error" : ""}
          placeholder="Registration plate"
        />

        <input
          type="text"
          onChange={(e) => setOwner(e.target.value)}
          value={owner}
          className={emptyFields.includes("owner") ? "error" : ""}
          placeholder="Current owner"
        />

        <button>Edit</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};

export default CarForm;
