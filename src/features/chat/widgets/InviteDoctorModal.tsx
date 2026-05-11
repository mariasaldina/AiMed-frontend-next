'use client';

import { Button, Modal, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface InviteDoctorModalProps {
    doctorId: number;
}

function InviteDoctorModal({ doctorId }: InviteDoctorModalProps) {
    const [opened, setOpened] = useState(false);

    const { chatId } = useParams();
    const parsedChatId = chatId ? Number(chatId) : null;

    const form = useForm({
        initialValues: {
            content: '',
        },
    });

    const onSubmit = async ({ content }: { content: string }) => {
        if (!parsedChatId) return;

        // dispatch(
        //     inviteDoctorThunk({ chatId: parsedChatId, doctorId, content }),
        // );
        form.reset();
        setOpened(false);
    };

    return (
        <>
            <Modal
                title="Запросить контакты"
                opened={opened}
                onClose={() => {
                    form.reset();
                    setOpened(false);
                }}
                centered
                closeOnClickOutside
            >
                <form onSubmit={form.onSubmit(onSubmit)}>
                    <Stack>
                        <TextInput
                            label="Сообщение для специалиста"
                            {...form.getInputProps('content')}
                        />
                        <Button type="submit">Отправить</Button>
                    </Stack>
                </form>
            </Modal>

            <Button
                type="button"
                onClick={() => setOpened(true)}
                variant="gradient"
            >
                Связаться
            </Button>
        </>
    );
}

export default InviteDoctorModal;
