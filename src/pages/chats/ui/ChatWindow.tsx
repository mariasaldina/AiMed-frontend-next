'use client';

import { useRef } from 'react';
import { Box, Center, Flex, Loader, ScrollArea } from '@mantine/core';
import TypingIndicator from '@/shared/ui/TypingIndicator';
import { useParams } from 'next/navigation';
import { useStores } from '@/shared/hooks/use-stores';
import { useInfiniteScroll } from '@/shared/hooks/use-infinite-scroll';
import { useLoadMessages } from '../model/use-load-messages';
import { useChatAutoScroll } from '../model/use-chat-auto-scroll';
import { Messages } from '@/widgets/message-list';
import { MessageInputObserved as MessageInput } from '@/widgets/message-input';

export function ChatWindow() {
    const params = useParams();
    if (!params) {
        return null;
    }

    const { chatId } = params;
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
        () =>
            rootStore.messageStore.async
                .loadMessages(parsedChatId)
                .catch((e) => console.log(e)),
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
                    <Messages />
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
