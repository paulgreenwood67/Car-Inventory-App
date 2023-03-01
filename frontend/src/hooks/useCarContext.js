import {CarsContext} from '../context/CarContext'
import { useContext } from 'react'

export const useCarContext = () =>{
 const context = useContext(CarsContext)

 if(!context){
    throw Error('useCarsContext must be used inside a CarsContextProvider')
 }

 return context

}