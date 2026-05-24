import { Status } from '@/shared/types/enums';

export interface Notification {
    id: number;
    status: Status;
    invitationId: number;
    isRead: boolean;
    createdAt: string;
}
