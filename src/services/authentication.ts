import AuthenticationResponse from "../types/AuthenticationResponse";
import AuthenticationRequest from "../types/AuthenticationRequest";
import axios from 'axios'
import UpdateCredentialsRequest from "../types/UpdateCredentialsRequest";
import ResetCredentialsRequest from "../types/ResetCredentialsRequest";

export async function authenticate(request : AuthenticationRequest) : Promise<AuthenticationResponse> {
    try{
        const response = await axios.post<AuthenticationResponse>('/v1/authenticate',request)
        if(response.data.token){
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            sessionStorage.setItem("user",JSON.stringify(response.data))
        }
        return response.data
    }catch(e){
        if((e as any).response?.status === 401){
            throw Error("E-mail e/ou senha inválidos.")
        }
        throw Error("Erro inesperado. Tente novamente mais tarde!")
    }
}

export async function updateCredentials(request: UpdateCredentialsRequest): Promise<void> {
    try{
        await axios.post<AuthenticationResponse>('/v1/authenticate/updateCredentials',request)
    }catch(e){
        throw e;
    }
}

export async function resetCredendials(request: ResetCredentialsRequest): Promise<void> {
    try{
        await axios.post<AuthenticationResponse>('/v1/authenticate/resetCredendials',request)
    }catch(e){
        throw e;
    }
}

