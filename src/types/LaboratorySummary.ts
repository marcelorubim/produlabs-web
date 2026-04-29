import Laboratory from "./Laboratory";

export default interface LaboratorySummary {
    laboratory: Laboratory;
    hospitalizationValue: number;
    ambulatoryValue: number;
    emergencyValue: number;
}