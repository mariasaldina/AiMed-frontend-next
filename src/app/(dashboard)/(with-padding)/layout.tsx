import { Box, ScrollArea } from '@mantine/core';
import { ReactNode } from 'react';

export default function PaddedWrapper({ children }: { children: ReactNode }) {
    return (
        <ScrollArea mih={0} h={'100%'} type="auto" offsetScrollbars>
            <Box
                px={{ base: 'md', sm: '20%' }}
                style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0,
                }}
                h={'100%'}
            >
                {children}
            </Box>
        </ScrollArea>
    );
}
