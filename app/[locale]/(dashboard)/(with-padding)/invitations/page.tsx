import { Metadata } from 'next';
import { InvitationsPage } from '@/pages/invitations';

export const metadata: Metadata = {
    title: 'Приглашения',
    description: 'Заявки от пациентов и ответы врачей',
};

export default function Page() {
    return <InvitationsPage />;
}
