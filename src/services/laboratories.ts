import Laboratory from "../types/Laboratory";
import axios from "axios";

export async function getAll() : Promise<Laboratory[]>{
    try{
        const response = await axios.get<Laboratory[]>('/v1/laboratory')
        return response.data
    }catch(e){
        throw e
    }
    
}