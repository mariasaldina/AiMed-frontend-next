import { Paper, Stack, Text } from '@mantine/core';
import type { ReactNode } from 'react';
import { displayTime } from '@/shared/lib/display-time';
import { useStatusColor } from '../hooks/use-status-color';
import { Status } from '../types/enums';

interface ColoredCardProps {
    status: Status;
    createdAt: string;
    children: ReactNode;
}

function ColoredCard({ status, createdAt, children }: ColoredCardProps) {
    const color = useStatusColor(status);

    return (
        <Paper
            withBorder
            p={{ base: 'md', sm: 'lg' }}
            style={{
                borderLeft: `20px solid ${color[4]}`,
                borderRadius: '0 20px 20px 0',
            }}
        >
            <Stack>
                {children}
                <Text size="xs" c="dimmed" ta="right" mt={4}>
                    {displayTime(createdAt)}
                </Text>
            </Stack>
        </Paper>
    );
}

export default ColoredCard;
