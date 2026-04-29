import { ExamActionTypes, GET_EXAMS_REQUEST } from "../types/ExamActionTypes"
export function getExams(): ExamActionTypes {
  return {
    type: GET_EXAMS_REQUEST,
  }
}