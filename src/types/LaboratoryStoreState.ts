import Laboratory from "./Laboratory";

export default interface LaboratoryStoreState {
    loading:boolean;
    error?:Error,
    laboratories: Laboratory[],
}