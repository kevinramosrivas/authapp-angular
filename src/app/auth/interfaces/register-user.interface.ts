import { AbstractControl } from "@angular/forms";

export interface UserRegisterInfo {
    name:     string;
    email:    string|undefined |null;
    role:     string;
    password: string;
    avatar:   string;
}


export interface RegisterResponse {
    email:      string;
    password:   string;
    name:       string;
    avatar:     string;
    role:       string;
    id:         number;
    creationAt: Date;
    updatedAt:  Date;
}

export interface ErrorRegister {
    message:    string[];
    error:      string;
    statusCode: number;
}

export interface UserLogin{
    email:    string;
    password: string;
}


export enum AuthStatus {
    checking = 'checking',
    authenticated = 'authenticated',
    notAuthenticated = 'notAuthenticated',
}


export interface User {
    id:       number;
    email:    string;
    password: string;
    name:     string;
    role:     string;
    avatar:   string;
}

export interface LoginResponse {
    access_token:  string;
    refresh_token: string;
}

export interface isEmailAvailableResponse {
    isAvailable: boolean;
}
