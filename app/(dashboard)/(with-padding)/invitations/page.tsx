'use client';

import { Metadata } from 'next';
import { InvitationsPage } from '@/pages/invitations';

export const invitationsMetadata: Metadata = {
    title: 'Приглашения',
    description: 'Заявки от пациентов и ответы врачей',
};

export default function Page() {
    return <InvitationsPage />;
}
