import { LaboratoryActionTypes, GET_LABORATORIES_REQUEST } from "../types/LaboratoryActionTypes"
export function getLaboratories(): LaboratoryActionTypes {
  return {
    type: GET_LABORATORIES_REQUEST,
  }
}