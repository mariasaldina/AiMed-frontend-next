import { Status } from '../types/enums';
import {
    IconCheckFilled,
    IconCircleXFilled,
    IconClipboardXFilled,
    IconClockFilled,
} from '@tabler/icons-react';

export const statusUiConfig: Record<
    Status,
    { color: string; Icon: React.ComponentType<any> }
> = {
    APPROVED: {
        color: 'green',
        Icon: IconCheckFilled,
    },
    REJECTED: {
        color: 'pink',
        Icon: IconCircleXFilled,
    },
    PENDING: {
        color: 'blue',
        Icon: IconClockFilled,
    },
    CANCELLED: {
        color: 'gray',
        Icon: IconClipboardXFilled,
    },
};
