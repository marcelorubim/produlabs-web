import Laboratory from "./Laboratory";

export default interface ProductivityStoreState {
    loadingExamID?:number;
    errorExamID?:number;
    error?:Error;
}