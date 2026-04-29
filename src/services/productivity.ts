import ExamHistory from "../types/ExamHistory"
import Axios from "axios"
import PatientsHistory from "../types/PatientsHistory"
import LaboratorySummary from "../types/LaboratorySummary"

export async function getExamsYearHistory(year : number) : Promise<ExamHistory[]>{
    try{
        const response = await Axios.get<ExamHistory[]>(`/v1/history/exam?year=${year}`)
        return response.data
    }catch(e){
        throw e
    }
    
}

export async function getExamsHistory(month: number, year : number) : Promise<ExamHistory[]>{
    if(!month) return getExamsYearHistory(year)
    try{
        const response = await Axios.get<ExamHistory[]>(`/v1/history/exam?month=${month}&year=${year}`)
        return response.data
    }catch(e){
        throw e
    }
    
}


export async function saveExamHistory(examHistory : ExamHistory) : Promise<void>{
    try{
        await Axios.post<void>(`/v1/history/exam`,examHistory)
    }catch(e){
        throw e
    }
    
}

export async function getLaboratoryYearExamsHistory(laboratoryId: number, year : number) : Promise<ExamHistory[]>{
    try{
        const response = await Axios.get<ExamHistory[]>(`/v1/history/exam/laboratory/${laboratoryId}?year=${year}`)
        return response.data
    }catch(e){
        throw e
    }
    
}

export async function getLaboratoryExamsHistory(laboratoryId: number, month: number, year : number) : Promise<ExamHistory[]>{
    if(!month) return getLaboratoryYearExamsHistory(laboratoryId,year)
    try{
        const response = await Axios.get<ExamHistory[]>(`/v1/history/exam/laboratory/${laboratoryId}?month=${month}&year=${year}`)
        return response.data
    }catch(e){
        throw e
    }
    
}


export async function getPatientsHistory(month: number, year : number) : Promise<PatientsHistory>{
    if(!month) return getPatientsYearHistory(year)
    try{
        const response = await Axios.get<PatientsHistory>(`/v1/history/patient?month=${month}&year=${year}`)
        return response.data
    }catch(e){
        throw e
    }    
}

export async function getPatientsYearHistory(year : number) : Promise<PatientsHistory>{
    try{
        const response = await Axios.get<PatientsHistory>(`/v1/history/patient?year=${year}`)
        return response.data
    }catch(e){
        throw e
    }    
}

export async function getLaboratoryPatientsHistory(laboratoryId: number, month: number, year : number) : Promise<PatientsHistory>{
    try{
        const response = await Axios.get<PatientsHistory>(`/v1/history/patient/laboratory/${laboratoryId}?month=${month}&year=${year}`)
        return response.data
    }catch(e){
        throw e
    }
    
}

export async function savePatientHistory(patientHistory : PatientsHistory) : Promise<void>{
    try{
        await Axios.post<void>(`/v1/history/patient`,patientHistory)
    }catch(e){
        throw e
    }
    
}

export async function closePatientHistory(patientHistory : PatientsHistory) : Promise<void>{
    try{
        await Axios.post<void>(`/v1/history/patient`,patientHistory)
    }catch(e){
        throw e
    }
    
}

export async function closeExamHistory(laboratoryId: number,period: string) : Promise<void>{
    try{
        await Axios.post<void>(`/v1/history//laboratory/${laboratoryId}/${period}/SENT`)
    }catch(e){
        throw e
    }
    
}

export async function getLaboratorySummary(month: number, year : number) : Promise<LaboratorySummary[]>{
    try{
        const response = await Axios.get<LaboratorySummary[]>(`/v1/history/laboratory/summary?month=${month}&year=${year}`)
        return response.data
    }catch(e){
        throw e
    }
    
}