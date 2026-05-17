'use client';

import { useEffect } from 'react';
import { Stack } from '@mantine/core';
import { useStores } from '@/app/providers/StoreProvider';
import { Invitation } from '@/entities/invitation/model/invitation.types';
import CardContainer from '@/shared/ui/CardContainer';
import PatientInvitationCard from '@/widgets/patient-invitation-card/ui/PatientInvitationCard';
import DoctorInvitationCard from '@/widgets/doctor-invitation-card/ui/DoctorInvitationCard';
import { observer } from 'mobx-react-lite';

const InvitationList = () => {
    const rootStore = useStores();
    const user = rootStore.userStore.state.user;
    const loading = rootStore.settingsStore.state.loading;
    const invitations = rootStore.invitationStore.state.invitations;

    useEffect(() => {
        rootStore.invitationStore.async.loadInvitations();
    }, []);

    const elementHandler = (i: Invitation) => {
        if (user?.role === 'PATIENT') {
            return <PatientInvitationCard invitation={i} />;
        }
        if (user?.role === 'DOCTOR') {
            return <DoctorInvitationCard invitation={i} />;
        }
        return null;
    };

    return (
        <Stack py={{ base: 'md', sm: 'xl' }} h={'100%'}>
            <CardContainer
                data={invitations}
                loading={loading['invitations/loadInvitations']}
                elementHandler={elementHandler}
            />
        </Stack>
    );
};

export default observer(InvitationList);
