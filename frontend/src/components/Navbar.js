import { Routes, Route, Link } from "react-router-dom";
import tyre from "../images/tyre.png";


// Navbar
const Navbar = () => {
    return ( 
        <header>
            
            <div className="container">
                <img className='tyre' src= {tyre}/>
                    <h1>Car Inventory</h1>
                    <div className="navbar">
            <ul>
                
            <Link className="nav-links"  to="/fiveYears">Cars over five years old</Link>
                <Link className="nav-links" to="/">All cars</Link>
              
                
            </ul>
                   
                   
                     </div>

                     </div>
        </header>
     );
}
 
export default Navbar;