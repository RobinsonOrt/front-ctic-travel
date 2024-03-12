export interface Users {
}

export interface LoginResult {
    error: boolean;
    token: string;
    userId: string;
    userRole: string;
    userEmail: string;
}
