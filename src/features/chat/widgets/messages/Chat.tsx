'use client';

import { useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Box, Center, Flex, Loader, ScrollArea } from '@mantine/core';
import { useChatMessages } from '../../hooks/useChatMessages';
import TypingIndicator from '@/shared/ui/TypingIndicator';
import { useParams } from 'next/navigation';
import { useStores } from '@/app/providers/StoreProvider';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';

const Chat = () => {
    const { chatId } = useParams();
    const parsedChatId = chatId ? Number(chatId) : null;

    const rootStore = useStores();
    const { hasMore } = rootStore.messageStore;
    const { loading } = rootStore.settingsStore;
    const sending =
        loading['chatMessages/sendMessage'] ||
        loading['chatMessages/findDoctors'] ||
        loading['chatMessages/inviteDoctor'];

    const scrollableRef = useRef<HTMLDivElement | null>(null);

    useChatMessages(parsedChatId, scrollableRef, sending);

    const { onScroll } = useInfiniteScroll(
        scrollableRef,
        Boolean(!parsedChatId || !hasMore),
        () => rootStore.messageStore.loadMessages(parsedChatId),
        loading['chatMessages/loadMessages'],
    );

    return (
        <Flex
            h={'100%'}
            direction={'column'}
            align={'center'}
            flex={1}
            mih={0}
            w="100%"
        >
            <ScrollArea
                w="100%"
                h={'100%'}
                type="auto"
                viewportRef={scrollableRef}
                offsetScrollbars
                onScrollCapture={onScroll}
            >
                <Box px={{ base: 'lg', sm: '10%' }} flex={1} mih={0} w="100%">
                    <div style={{ height: 1 }} />

                    {loading['chatMessages/loadMessages'] && (
                        <Box
                            pos="absolute"
                            top={10}
                            left={0}
                            right={0}
                            display="flex"
                            w="100%"
                        >
                            <Center w="100%">
                                <Loader size="sm" />
                            </Center>
                        </Box>
                    )}
                    <MessageList />
                    {sending ? (
                        <Box p={{ base: 'md', sm: 'xl' }}>
                            <TypingIndicator />
                        </Box>
                    ) : (
                        <></>
                    )}
                </Box>
            </ScrollArea>

            <Box px={{ base: 'lg', sm: '10%' }} w="100%">
                {parsedChatId && <MessageInput chatId={parsedChatId} />}
            </Box>
        </Flex>
    );
};

export default Chat;
