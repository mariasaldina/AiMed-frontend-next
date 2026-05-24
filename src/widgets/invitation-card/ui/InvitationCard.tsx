import { UserRole } from '@/shared/types/enums';
import DoctorInvitationCard from './DoctorInvitationCard';
import PatientInvitationCard from './PatientInvitationCard';
import { Invitation } from '@/entities/invitation/model/types';

interface InvitationCardProps {
    role: UserRole;
    invitation: Invitation;
}

export function InvitationCard({ role, invitation }: InvitationCardProps) {
    if (role === 'DOCTOR')
        return <DoctorInvitationCard invitation={invitation} />;
    return <PatientInvitationCard invitation={invitation} />;
}
