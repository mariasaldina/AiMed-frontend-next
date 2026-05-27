'use client';

import { useStores } from '@/shared/hooks/use-stores';
import { ProfileForm } from '@/widgets/profile-form';
import { Box, Button, Center, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { observer } from 'mobx-react-lite';

function Questionnaire() {
    const [isEditing, { open, close }] = useDisclosure(false);

    const rootStore = useStores();
    const { user } = rootStore.userStore.state;
    if (!user) {
        return null;
    }

    return (
        <Center py={{ base: 'lg', sm: 'xl' }} h={'100%'}>
            <Stack h={'100%'} w={'100%'}>
                <Button
                    style={{ alignSelf: 'flex-end' }}
                    leftSection={<IconEdit />}
                    onClick={() => open()}
                    disabled={isEditing}
                >
                    Редактировать
                </Button>

                <Box flex={1} mih={0}>
                    <ProfileForm
                        role={user?.role}
                        isEditing={isEditing}
                        onCancel={close}
                    />
                </Box>
            </Stack>
        </Center>
    );
}

export const QuestionnairePage = observer(Questionnaire);