import User from "./User";

export default interface Entity {
    id: number;
    createdAt: string;
    createdBy: User;
    deletedAt: string;
    deletedBy: User;
}