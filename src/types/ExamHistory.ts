import Entity from "./Entity";
import Laboratory from "./Laboratory";
import Exam from "./Exam";
import ExamHistoryState from "./ExamHistoryState";
import User from "./User";
import ExamHistoryID from "./ExamHistoryID";

export default interface ExamHistory {
    id: ExamHistoryID;
    period: string;
    hospitalizationValue: number;
    ambulatoryValue: number;
    emergencyValue: number;
    state: ExamHistoryState;
    createdAt: string;
    createdBy: User;
    deletedAt: string;
    deletedBy: User;
}