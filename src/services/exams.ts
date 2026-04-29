import axios from "axios";
import Exam from "../types/Exam";
import Sector from "../types/Sector";

export async function getAll() : Promise<Exam[]>{
    try{
        const response = await axios.get<Exam[]>('/v1/exam')
        return response.data
    }catch(e){
        throw e
    }
    
}

export async function getSectors() : Promise<Sector[]>{
    try{
        const response = await axios.get<Sector[]>('/v1/sector')
        return response.data
    }catch(e){
        throw e
    }
    
}

export async function saveExam(exam:Exam) : Promise<Exam>{
    try{
        const response = await axios.post<Exam>('/v1/exam',exam)
        return response.data;
    }catch(e){
        throw e
    }
    
}

export async function deleteExam(exam:Exam) : Promise<void>{
    try{
        await axios.delete<void>(`/v1/exam/${exam.id}`)
    }catch(e){
        throw e
    }
    
}