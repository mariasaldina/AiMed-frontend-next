'use client';

import { ReactNode, useRef } from 'react';
import { Box, Center, Flex, Loader, ScrollArea } from '@mantine/core';
import TypingIndicator from '@/shared/ui/TypingIndicator';
import { useParams } from 'next/navigation';
import { useStores } from '@/app/providers/StoreProvider';
import { observer } from 'mobx-react-lite';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';
import MessageInput from './MessageInput';
import { useLoadMessages } from '@/features/load-messages/model/use-load-messages';
import { useChatAutoScroll } from '../model/use-chat-auto-scroll';

function ChatWindow({ children }: { children: ReactNode }) {
    const { chatId } = useParams();
    const parsedChatId = chatId ? Number(chatId) : null;

    const rootStore = useStores();

    const { hasMore } = rootStore.messageStore.state;
    const { loading } = rootStore.settingsStore.state;
    const sending =
        loading['chatMessages/sendMessage'] ||
        loading['chatMessages/findDoctors'] ||
        loading['invitations/inviteDoctor'];

    const scrollableRef = useRef<HTMLDivElement | null>(null);

    useLoadMessages(parsedChatId);
    useChatAutoScroll(parsedChatId, scrollableRef, sending);

    const { onScroll } = useInfiniteScroll(
        scrollableRef,
        Boolean(!parsedChatId || !hasMore),
        () => rootStore.messageStore.async.loadMessages(parsedChatId),
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
                    {children}
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
}

export default observer(ChatWindow);
