'use client';

import { useEffect } from 'react';
import { Stack } from '@mantine/core';
import { useStores } from '@/shared/hooks/use-stores';
import { Invitation } from '@/entities/invitation/model/invitation.types';
import CardContainer from '@/shared/ui/CardContainer';
import PatientInvitationCard from '@/pages/invitations/ui/PatientInvitationCard';
import DoctorInvitationCard from '@/pages/invitations/ui/DoctorInvitationCard';

export function InvitationList() {
    const rootStore = useStores();
    const user = rootStore.userStore.state.user;
    const loading = rootStore.settingsStore.state.loading;
    const invitations = rootStore.invitationStore.state.invitations;

    useEffect(() => {
        rootStore.invitationStore.async
            .loadInvitations()
            .catch((e) => console.log(e));
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
}
