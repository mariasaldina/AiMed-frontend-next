import { Accordion, Button, Text } from '@mantine/core';
import { IconClipboardHeart } from '@tabler/icons-react';
import { useState } from 'react';
import { Invitation } from '@/entities/invitation/model/invitation.types';
import { useStatusColor } from '@/shared/hooks/use-status-color';
import { useStores } from '@/app/providers/StoreProvider';
import StatusMessage from '@/shared/ui/StatusMessage';
import DoctorCard from '@/entities/invitation/ui/DoctorCard';
import ContactsCard from '@/entities/user/ui/ContactsCard';
import { observer } from 'mobx-react-lite';

interface PatientInvitationCardProps {
    invitation: Invitation;
}

function PatientInvitationCard({ invitation }: PatientInvitationCardProps) {
    const rootStore = useStores();
    const { loading } = rootStore.settingsStore.state;

    const color = useStatusColor(invitation.status);

    const [clicked, setClicked] = useState(false);

    const handleCancel = () => {
        setClicked(true);
        rootStore.invitationStore.async.cancelInvitation(invitation.id);
    };

    return (
        <>
            {invitation.status === 'PENDING' && (
                <StatusMessage
                    status={invitation.status}
                    text="Вы отправили приглашение к диалогу"
                />
            )}

            {invitation.status === 'APPROVED' && (
                <>
                    <StatusMessage
                        status={invitation.status}
                        text="Специалист поделился с вами контактами"
                    />
                    <ContactsCard contacts={invitation.doctor.contacts} />
                </>
            )}

            {invitation.status === 'REJECTED' && (
                <StatusMessage
                    status={invitation.status}
                    text="Специалист отклонил ваше приглашение"
                />
            )}

            {invitation.status === 'CANCELLED' && (
                <StatusMessage
                    status={invitation.status}
                    text="Вы отменили приглашение"
                />
            )}

            {invitation.doctor && (
                <Accordion>
                    <Accordion.Item value={'Детали'}>
                        <Accordion.Control
                            icon={<IconClipboardHeart color={color[6]} />}
                        >
                            <Text size="sm">О специалисте</Text>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <DoctorCard doctor={invitation.doctor} />
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            )}

            {invitation.status === 'PENDING' && (
                <Button
                    variant="light"
                    onClick={handleCancel}
                    loading={loading['invitations/cancelInvitation']}
                    disabled={clicked}
                >
                    Отменить
                </Button>
            )}
        </>
    );
}

export default observer(PatientInvitationCard);
