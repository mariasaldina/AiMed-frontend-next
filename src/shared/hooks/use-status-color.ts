import { useMantineTheme } from '@mantine/core';
import { Status } from '../types/enums';
import { statusUiConfig } from '../config/status-ui-config';

export const useStatusColor = () => {
    const theme = useMantineTheme();
    return (status: Status) => theme.colors[statusUiConfig[status].color];
};
