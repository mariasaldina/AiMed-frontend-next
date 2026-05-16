import { useMantineTheme } from '@mantine/core';
import { Status } from '../types/enums';
import { statusUiConfig } from '../config/status-ui-config';

export const useStatusColor = (status: Status) => {
    const theme = useMantineTheme();
    return theme.colors[statusUiConfig[status].color];
};
