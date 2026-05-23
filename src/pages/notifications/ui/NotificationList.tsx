'use client';

import { Accordion, Stack } from '@mantine/core';
import { useEffect } from 'react';
import { useStores } from '@/shared/hooks/use-stores';
import { Notification } from '@/entities/notification/model/notification.types';
import StatusMessage from '@/shared/ui/StatusMessage';
import CardContainer from '@/shared/ui/CardContainer';

export function NotificationList() {
    const rootStore = useStores();
    const { read, unread } = rootStore.notificationStore.state;
    const { loading } = rootStore.settingsStore.state;

    useEffect(() => {
        rootStore.notificationStore.async
            .loadNotifications()
            .catch((e) => console.log(e));

        return () => {
            rootStore.notificationStore.async
                .readNotifications()
                .catch((e) => console.log(e));
        };
    }, []);

    const elementHandler = (n: Notification) => {
        switch (n.status) {
            case 'APPROVED': {
                return (
                    <StatusMessage
                        status={n.status}
                        text="Специалист принял ваше приглашение"
                    />
                );
            }
            case 'REJECTED': {
                return (
                    <StatusMessage
                        status={n.status}
                        text="Специалист отклонил ваше приглашение"
                    />
                );
            }
            case 'PENDING': {
                return (
                    <StatusMessage
                        status={n.status}
                        text="Вы получили приглашение от пациента"
                    />
                );
            }
            case 'CANCELLED': {
                return (
                    <StatusMessage
                        status={n.status}
                        text="Пациент отменил своё приглашение"
                    />
                );
            }
        }
    };

    return (
        <Stack py={{ base: 'md', sm: 'xl' }}>
            <CardContainer
                data={unread}
                loading={loading['notifications/loadNotifications']}
                elementHandler={elementHandler}
            />

            <Accordion>
                <Accordion.Item value="read">
                    <Accordion.Control>Прочитанные</Accordion.Control>

                    <Accordion.Panel>
                        <CardContainer
                            data={read}
                            loading={loading['notifications/loadNotifications']}
                            elementHandler={elementHandler}
                        />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Stack>
    );
}
