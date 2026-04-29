import Exam from "./Exam";
import Sector from "./Sector";

export default interface ExamStoreState {
    loading:boolean;
    error?:Error,
    exams: Exam[],
    sectors: Sector[],
    activeExams: Exam[],
    examsMap: Map<number, Exam>;
}