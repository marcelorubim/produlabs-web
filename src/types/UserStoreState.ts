import User from "./User";

export default interface UserStoreState {
    loading:boolean;
    error?:Error,
    users: User[],
    currentUser: User | null;
    token: string | null;
}