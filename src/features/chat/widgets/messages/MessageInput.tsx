'use client';

import { Button, Flex, Textarea } from '@mantine/core';
import useMessageInput from '../../hooks/useMessageInput';
import { useStores } from '@/app/providers/StoreProvider';
import { observer } from 'mobx-react-lite';

interface MessageInputProps {
    chatId?: number;
    showLoading?: boolean;
}

function MessageInput({ chatId, showLoading = false }: MessageInputProps) {
    const rootStore = useStores();
    const { loading } = rootStore.settingsStore;
    const sending =
        loading['chatMessages/sendMessage'] ||
        loading['chatMessages/findDoctors'] ||
        loading['chatMessages/sendMessageNonOptimistic'];
    const { content, setContent, handleSend, findDoctors } =
        useMessageInput(chatId);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSend();
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
