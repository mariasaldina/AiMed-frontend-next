'use client';

import { Flex, Text } from '@mantine/core';
import { statusUiConfig } from '../config/status-ui-config';
import { Status } from '../types/enums';
import { useStatusColor } from '../hooks/use-status-color';

interface StatusMessageProps {
    status: Status;
    text: string;
}

function StatusMessage({ status, text }: StatusMessageProps) {
    const theme = useStatusColor();
    const color = theme(status);
    const Icon = statusUiConfig[status].Icon;

    return (
        <Flex gap={'md'} bg={`${color}.1`} p={'sm'} bdrs={0} align={'center'}>
            <Icon color={color[8]} />
            <Text fz={{ base: 'sm', sm: 'md' }}>{text}</Text>
        </Flex>
    );
}

export default StatusMessage;
