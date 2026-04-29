import AuthenticationRequest from "./AuthenticationRequest";

export default interface UpdateCredentialsRequest extends AuthenticationRequest {
    newPassword: string;
}