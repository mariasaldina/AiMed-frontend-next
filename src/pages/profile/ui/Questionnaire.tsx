'use client';

import { useStores } from '@/shared/hooks/use-stores';
import PatientProfileForm from './PatientProfileForm';
import DoctorProfileForm from './DoctorProfileForm';
import { useEditable } from './EditableLayout';

export function Questionnaire() {
    const { isEditing, close } = useEditable();
    const rootStore = useStores();
    const { user } = rootStore.userStore.state;

    if (user?.role === 'PATIENT') {
        return <PatientProfileForm isEditing={isEditing} onCancel={close} />;
    }

    if (user?.role === 'DOCTOR') {
        return <DoctorProfileForm isEditing={isEditing} onCancel={close} />;
    }
}
