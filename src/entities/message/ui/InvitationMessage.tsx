import { Blockquote, Paper, Stack, Text } from '@mantine/core';
import { IconQuoteFilled } from '@tabler/icons-react';

interface InvitationMessage {
    content: string;
    fullName: string;
}

function InvitationMessage({ content, fullName }: InvitationMessage) {
    return (
        <Paper
            p="lg"
            bg="light-dark(var(--mantine-color-indigo-1), var(--mantine-color-indigo-9))"
            style={{
                alignSelf: 'center',
                borderRadius: 12,
                maxWidth: '70%',
            }}
        >
            <Stack p={'md'}>
                <Text>Вы отправили уведомление специалисту:</Text>

                <Text style={{ alignSelf: 'center' }}>{fullName}</Text>

                <Blockquote
                    icon={<IconQuoteFilled />}
                    p={'md'}
                    style={{
                        borderLeftColor: 'light-dark(var(--mantine-color-indigo-9), var(--mantine-color-indigo-4))'
                    }}
                >
                    <Text>{content}</Text>
                </Blockquote>
            </Stack>
        </Paper>
    );
}

export default InvitationMessage;
