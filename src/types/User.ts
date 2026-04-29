import UserProfile from './UserProfile'
import Laboratory from './Laboratory';
import Entity from './Entity';

export default interface User extends Entity {
    fullName: string;
    email: string;
    password: string;
    telephone: string;
    userProfile?: UserProfile
    passwordExpired: boolean;
    userLaboratories: Laboratory[];
    numberLogins: number;
    lastLogin: string;
}