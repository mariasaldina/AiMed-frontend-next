import { Contacts } from '@/shared/types/contacts';
import { Gender, Status } from '@/shared/types/enums';

export interface DoctorPreviewType {
    username: string;
    fullName: string;
    address: string;
    education: string;
    description: string;
    practiceStartDate: Date;
    specializations: string[];
    contacts?: Contacts;
}

export interface PatientPreviewType {
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
    doctor: DoctorPreviewType;
    patient: PatientPreviewType;
}
