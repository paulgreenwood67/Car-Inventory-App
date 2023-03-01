import tyre2 from "../images/tyre2.png";
import {useCarContext} from '../hooks/useCarContext'
import {useState} from "react"

// Setting the car states
const CarDetails = ({car}) => {
    const [updateId, setUpdateId] = useState();
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [registration, setRegistration] = useState("");
    const [owner, setOwner] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const { dispatch } = useCarContext();
    const [isUpdate, setIsUpdate] = useState(false);
    const updateCar = { make, model, year, registration, owner };


 // function to handle updating one car   
    const handleUpdate = (e) => {
        e.preventDefault();
        let id = updateId;
        console.log("id", id);
        fetch(`/api/cars/update/${id}`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(updateCar),
        })
          .then((res) => res.json())
          .then((data) => {
            alert(`Updated car, refresh screen`);
            
          });
      };
 // function to handle deleting car  
const handleDelete = async () => {
    const response = await fetch('/api/cars/' + car._id,{
        method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok){
        dispatch({type: 'DELETE_CAR', payload:json})

    }
}
 // added car output and update one car form... these are both the same thing 
    return (  
        
<div className="car-details">
<form className="updateForm" onSubmit={handleUpdate}>
    <h4> 
        <label><img className='tyre2' src= {tyre2}/></label>
        <input 
        className="updateMake"
        type ="text"
        placeholder={car.make}
        onChange = {(e)=> setMake(e.target.value)}
        value = {make}
        >
        </input>
    </h4>

    <p>
        <label>Model:</label> 
        <input 
        className="updateFormInput"
        type ="text"
        placeholder={car.model}
        onChange = {(e)=> setModel(e.target.value)}
        value = {model}
        >           
        </input>
        </p>

    <p>
        <label>Year of registration:</label> 
        <input 
        className="updateFormInput"
        type ="number"  
        placeholder={car.year}
        onChange = {(e)=> setYear(e.target.value)}
        value = {year}
        >
        </input>
    </p>

    <p>
        <label>Registration plate:</label> 
        <input 
        className="updateFormInput" 
        type ="text" 
        placeholder={car.registration}
        onChange = {(e)=> setRegistration(e.target.value)}
        value = {registration}
        >
        </input>

    </p>

    <p>
        <label>Current owner:</label> 
        <input 
        className="updateFormInput" 
        type ="text" 
        placeholder={car.owner}
        onChange = {(e)=> setOwner(e.target.value)}
        value = {owner}  
        >
        </input>
    </p>

    <button data-id={car._id}>Submit edit</button>
  </form>  
  
    <span className="material-symbols-outlined " onClick={handleDelete}>delete</span>

</div>

    );
}
 
export default CarDetails;