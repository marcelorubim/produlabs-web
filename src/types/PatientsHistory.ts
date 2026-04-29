import Entity from "./Entity";
import Laboratory from "./Laboratory";
import ExamHistoryState from "./ExamHistoryState";

export default interface PatientsHistory extends Entity {
    laboratory: Laboratory;
    period: string;
    patientsValue: number;
    state: ExamHistoryState;
}