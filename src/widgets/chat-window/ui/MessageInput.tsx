'use client';

import { Button, Flex, Textarea } from '@mantine/core';
import { useStores } from '@/shared/hooks/use-stores';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import useSendMessage from '@/features/send-message/model/use-send-message';
import useFindDoctors from '@/features/find-doctors/model/use-find-doctors';

interface MessageInputProps {
    chatId?: number;
    showLoading?: boolean;
}

function MessageInput({ chatId, showLoading = false }: MessageInputProps) {
    const [content, setContent] = useState('');

    const rootStore = useStores();
    const { loading } = rootStore.settingsStore.state;
    const sending =
        loading['chatMessages/sendMessage'] ||
        loading['chatMessages/findDoctors'] ||
        loading['chatMessages/sendMessageNonOptimistic'];

    const sendMessage = useSendMessage(chatId, content, setContent);
    const findDoctors = useFindDoctors(chatId);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
            }}
            style={{ width: '100%' }}
        >
            <Flex
                align={'stretch'}
                gap={{ base: 'sm', sm: 'md' }}
                pb={{ base: 'lg', sm: 'xl' }}
                direction={{ base: 'column', sm: chatId ? 'row' : 'column' }}
                w={'100%'}
            >
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Опишите свои симптомы"
                    disabled={sending}
                    flex={1}
                    minRows={3}
                    maxRows={5}
                    autosize
                />
                <Flex direction={'column'} gap={{ base: 'sm' }}>
                    <Button
                        type="submit"
                        disabled={sending}
                        style={{ flexShrink: 0 }}
                        loading={showLoading && sending}
                    >
                        Отправить
                    </Button>
                    {chatId && (
                        <Button
                            type="button"
                            onClick={findDoctors}
                            disabled={sending}
                            style={{ flexShrink: 0 }}
                        >
                            Найти специалиста
                        </Button>
                    )}
                </Flex>
            </Flex>
        </form>
    );
}

export default observer(MessageInput);
