import { Contacts } from '@/entities/user/model/user.types';
import { Gender, Status } from '@/shared/types/enums';

export interface DoctorCardType {
    username: string;
    fullName: string;
    address: string;
    education: string;
    description: string;
    practiceStartDate: Date;
    specializations: string[];
    contacts?: Contacts;
}

export interface PatientCardType {
    fullName: string;
    address: string;
    birthdate: Date;
    gender: Gender;
    medicalHistory: string;
}

export interface Invitation {
    id: number;
    content: string;
    createdAt: string;
    respondedAt: string;
    status: Status;
    doctor: DoctorCardType;
    patient: PatientCardType;
}
