'use client';

import { useStores } from '@/app/providers/StoreProvider';
import PatientProfileForm from '@/widgets/patient-profile/ui/PatientProfileForm';
import DoctorProfileForm from '@/widgets/doctor-profile/ui/DoctorProfileForm';
import { useEditable } from '../layout';
import { observer } from 'mobx-react-lite';
import { Metadata } from 'next';

export const questionnaireMetadata: Metadata = {
    title: 'Анкета',
    description: 'Страница редактирования анкеты пользователя',
};

const Questionnaire = () => {
    const { isEditing, close } = useEditable();
    const rootStore = useStores();
    const { user } = rootStore.userStore.state;

    if (user?.role === 'PATIENT') {
        return <PatientProfileForm isEditing={isEditing} onCancel={close} />;
    }

    if (user?.role === 'DOCTOR') {
        return <DoctorProfileForm isEditing={isEditing} onCancel={close} />;
    }
};

export default observer(Questionnaire);
