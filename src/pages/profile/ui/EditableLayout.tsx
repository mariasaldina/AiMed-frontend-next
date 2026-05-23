'use client';

import { Box, Button, Center, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, ReactNode } from '@tabler/icons-react';
import { createContext, useContext } from 'react';

type EditableContextType = {
    isEditing: boolean;
    close: () => void;
    open: () => void;
};

const EditableContext = createContext<EditableContextType | null>(null);

export const useEditable = () => {
    const ctx = useContext(EditableContext);
    if (!ctx) throw new Error('useEditable используется только в /profile');
    return ctx;
};

export function EditableLayout({ children }: { children: ReactNode }) {
    const [isEditing, { open, close }] = useDisclosure(false);

    return (
        <EditableContext.Provider value={{ isEditing, open, close }}>
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
                        {children}
                    </Box>
                </Stack>
            </Center>
        </EditableContext.Provider>
    );
}
