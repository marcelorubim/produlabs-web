import User from "./User";

export default interface AuthenticationResponse {
    user: User;
    token: string;
    shouldUpdatePassword: boolean;
}