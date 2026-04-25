import { UrgencyStatus } from '@/shared/types/enums';

export interface DoctorDto {
    userId: number;
    fullName: string;
    specializations: string[];
    address: string;
    education: string;
    description: string;
    practiceStartDate: string;
}

export interface MessageDto {
    id: number;
    type: 'USER' | 'ASSISTANT' | 'DOCTOR_SUGGESTIONS';
    createdAt: string;
    userPayload?: {
        content: string;
    };
    assistantPayload?: {
        possibleCauses: string[];
        recommendations: string[];
        urgency: UrgencyStatus;
        doctors: string[];
    };
    doctorSuggestionsPayload?: DoctorDto[];
    invitationPayload?: {
        fullName: string;
        content: string;
    };
}
