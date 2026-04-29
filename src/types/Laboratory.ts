import Entity from "./Entity";

export default interface Laboratory extends Entity {
    initials: string;
    name: string;
    region: string;
}