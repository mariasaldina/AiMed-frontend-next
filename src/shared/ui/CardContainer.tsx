import { Center, Flex, Loader, Paper, Stack, Text } from '@mantine/core';
import type { ReactNode } from 'react';
import { Status } from '../types/enums';
import { displayTime } from '../lib/display-time';
import { useStatusColor } from '../hooks/use-status-color';

interface Item {
    id: number | string;
    status: Status;
    createdAt: string;
}

interface CardContainerProps<T extends Item> {
    data: T[];
    elementHandler: (el: T) => ReactNode;
    loading: boolean;
}

function CardContainer<T extends Item>({
    data,
    elementHandler,
    loading,
}: CardContainerProps<T>) {
    const color = useStatusColor();

    return (
        <Flex direction={'column'} gap={{ base: 'md', sm: 'xl' }} w="100%">
            {loading ? (
                <Center h={'100%'}>
                    <Loader />
                </Center>
            ) : (
                data.map((el) => (
                    <Paper
                        key={el.id}
                        withBorder
                        p={{ base: 'md', sm: 'lg' }}
                        style={{
                            borderLeft: `20px solid ${color(el.status)[4]}`,
                            borderRadius: '0 20px 20px 0',
                        }}
                    >
                        <Stack>
                            {elementHandler(el)}
                            <Text size="xs" c="dimmed" ta="right" mt={4}>
                                {displayTime(el.createdAt)}
                            </Text>
                        </Stack>
                    </Paper>
                ))
            )}
        </Flex>
    );
}

export default CardContainer;
