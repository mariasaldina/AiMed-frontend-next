import { Contacts } from "@/shared/types/contacts";
import { Gender, UserRole } from "@/shared/types/enums";

export interface User {
    id: number;
    username: string;
    fullName: string;
    role: UserRole;
    profile: PatientProfile | DoctorProfile;
    contacts: Contacts;
}

export interface PatientProfile {
    address: string | null;
    birthdate: Date | null;
    gender: Gender | null;
    medicalHistory: string | null;
}

export interface DoctorProfile {
    address: string | null;
    education: string | null;
    description: string | null;
    practiceStartDate: Date | null;
    specializationIds: number[];
}