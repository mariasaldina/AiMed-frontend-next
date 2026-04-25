import { UrgencyStatus } from '@/shared/types/enums';

export interface Doctor {
    userId: string;
    fullName: string;
    specializations: string[];
    address: string;
    education: string;
    description: string;
    practiceStartDate: string;
}

export type Message =
    | {
          kind: 'user';
          id: string;
          createdAt: string;
          content: string;
      }
    | {
          kind: 'assistant';
          id: string;
          createdAt: string;
          possibleCauses: string[];
          recommendations: string[];
          urgency: UrgencyStatus;
          doctors: string[];
      }
    | {
          kind: 'doctorSuggestions';
          id: string;
          createdAt: string;
          doctors: Doctor[];
      }
    | {
          kind: 'invitation';
          id: string;
          createdAt: string;
          doctorsFullName: string;
          content: string;
      };
