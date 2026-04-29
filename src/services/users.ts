import axios from "axios";
import User from "../types/User";

export async function getAll() : Promise<User[]>{
    try{
        const response = await axios.get<User[]>('/v1/user')
        return response.data
    }catch(e){
        throw e
    }
    
}

export async function addUser(user: User) : Promise<void> {
    try{
        await axios.post('/v1/user',user)
    }catch(e){
        throw e
    }
}