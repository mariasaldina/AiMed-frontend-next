import { Center, Stack, Text } from '@mantine/core';
import MessageInput from '@/widgets/chat-window/ui/MessageInput';

export default function ChatPage() {
    return (
        <Center h={'100%'}>
            <Stack w={'60%'}>
                <Text
                    style={{ alignSelf: 'center' }}
                    fz={'30'}
                    fw={600}
                    c={'indigo.8'}
                >
                    Начните новый чат
                </Text>
                <MessageInput showLoading />
            </Stack>
        </Center>
    );
}
