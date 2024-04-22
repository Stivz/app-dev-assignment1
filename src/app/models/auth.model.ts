export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    token: string;
    user: User;
}