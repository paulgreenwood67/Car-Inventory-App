import { useEffect} from "react";
import { useCarContext } from "../hooks/useCarContext";


//components
import CarDetails from '../components/CarDetails'
import CarForm from '../components/CarForm'
import UpdateOneForm from '../components/UpdateOneForm'


const Home = () => {
    const {cars, dispatch} =  useCarContext()
    useEffect (()=>{
        const fetchCars = async ()=>{
            const response = await fetch ('/api/cars')
            const json = await response.json()

            if (response.ok){
                dispatch({type: 'SET_CARS', payload: json})  
            }
        }
        fetchCars()

    }, [])
    return ( 
        
      
        <div className="home">
            
         
          <div className="cars">
           
          <h2 className="allCars ">All cars </h2> 
          <p className="allCars2">{" (Click car details to update, all fields must be updated)"}</p>
         
            {cars && cars.map((car) =>(
               <CarDetails key = {car._id} car={car}/>
            ))}
           
          </div>
           <div>
          <CarForm /> 
         
         </div>
            
          </div>
         
          
     );
}
 
export default Home;