import {
    Accordion,
    Blockquote,
    Button,
    Group,
    Stack,
    Text,
} from '@mantine/core';
import { useState } from 'react';
import { useStores } from '@/shared/hooks/use-stores';
import { Invitation } from '@/entities/invitation/model/invitation.types';
import StatusMessage from '@/shared/ui/StatusMessage';
import { statusUiConfig } from '@/shared/config/status-ui-config';
import PatientCard from '@/entities/invitation/ui/PatientCard';
import { observer } from 'mobx-react-lite';

interface DoctorInvitationCardProps {
    invitation: Invitation;
}

function DoctorInvitationCard({ invitation }: DoctorInvitationCardProps) {
    const rootStore = useStores();
    const { loading } = rootStore.settingsStore.state;

    const [clicked, setClicked] = useState<'APPROVED' | 'REJECTED' | null>(
        null,
    );

    const handleApprove = async () => {
        setClicked('APPROVED');
        rootStore.invitationStore.async
            .sendDoctorsResponse('APPROVED', invitation.id)
            .catch((e) => console.log(e));
    };

    const handleReject = async () => {
        setClicked('REJECTED');
        rootStore.invitationStore.async
            .sendDoctorsResponse('REJECTED', invitation.id)
            .catch((e) => console.log(e));
    };

    return (
        <Stack>
            {invitation.status === 'APPROVED' && (
                <StatusMessage
                    status="APPROVED"
                    text="Вы дали пациенту свои контакты"
                />
            )}

            {invitation.status === 'REJECTED' && (
                <StatusMessage
                    status="REJECTED"
                    text="Вы отклонили приглашение"
                />
            )}

            {invitation.status === 'PENDING' && (
                <StatusMessage status="PENDING" text="Вы получили заявку" />
            )}

            <Blockquote
                p={{ base: 'sm' }}
                color={statusUiConfig[invitation.status].color}
            >
                {invitation.content}
            </Blockquote>

            <Accordion>
                <Accordion.Item value={'Детали'}>
                    <Accordion.Control>
                        <Text size="sm">О пациенте</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <PatientCard patient={invitation.patient} />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>

            {invitation.status === 'PENDING' && (
                <Group justify="flex-start" mt="xs">
                    <Button
                        variant="filled"
                        onClick={handleApprove}
                        loading={
                            clicked === 'APPROVED' &&
                            loading['invitations/sendDoctorsResponse']
                        }
                        disabled={clicked !== null}
                    >
                        Дать контакты
                    </Button>

                    <Button
                        variant="light"
                        onClick={handleReject}
                        loading={
                            clicked === 'REJECTED' &&
                            loading['invitations/sendDoctorsResponse']
                        }
                        disabled={clicked !== null}
                    >
                        Отклонить
                    </Button>
                </Group>
            )}
        </Stack>
    );
}

export default observer(DoctorInvitationCard);
