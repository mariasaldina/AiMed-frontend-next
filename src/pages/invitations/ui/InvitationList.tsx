'use client';

import { useEffect } from 'react';
import { Stack } from '@mantine/core';
import { useStores } from '@/shared/hooks/use-stores';
import { Invitation } from '@/entities/invitation/model/types';
import CardContainer from '@/shared/ui/CardContainer';
import { InvitationCard } from '@/widgets/invitation-card';

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

    if (!user) {
        return null;
    }

    const elementHandler = (i: Invitation) => {
        return <InvitationCard role={user.role} invitation={i} />;
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
