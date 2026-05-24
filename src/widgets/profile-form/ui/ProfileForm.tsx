import { UserRole } from '@/shared/types/enums';
import DoctorProfileForm from './DoctorProfileForm';
import PatientProfileForm from './PatientProfileForm';

interface ProfileFormProps {
    role: UserRole;
    isEditing: boolean;
    onCancel: () => void;
}

export function ProfileForm({ role, isEditing, onCancel }: ProfileFormProps) {
    if (role === 'DOCTOR')
        return <DoctorProfileForm isEditing={isEditing} onCancel={onCancel} />;
    return <PatientProfileForm isEditing={isEditing} onCancel={onCancel} />;
}
