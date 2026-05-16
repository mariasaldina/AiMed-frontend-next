'use client';

import { Flex, Text, useMantineTheme } from '@mantine/core';
import { statusUiConfig } from '../config/status-ui-config';

type Status = 'APPROVED' | 'REJECTED' | 'PENDING' | 'CANCELLED';

interface StatusMessageProps {
    status: Status;
    text: string;
}

function StatusMessage({ status, text }: StatusMessageProps) {
    const theme = useMantineTheme();
    const color = statusUiConfig[status].color;
    const Icon = statusUiConfig[status].Icon;

    return (
        <Flex gap={'md'} bg={`${color}.1`} p={'sm'} bdrs={0} align={'center'}>
            <Icon color={theme.colors[color][8]} />
            <Text fz={{ base: 'sm', sm: 'md' }}>{text}</Text>
        </Flex>
    );
}

export default StatusMessage;
