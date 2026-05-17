import { UserRole } from "@/shared/types/enums";

export interface LoginCredentialsDto {
    username: string;
    password: string;
}

export interface SignUpCredentialsDto {
    username: string;
    password: string;
    fullName: string;
    role: UserRole;
}
