import Entity from "./Entity";
import Sector from "./Sector";

export default interface Exam extends Entity {
    name: string;
    sector: Sector;
    codeSUS: string;
}