'use client';

import {
    ActionIcon,
    MantineColorScheme,
    useMantineColorScheme,
} from '@mantine/core';
import {
    IconDeviceDesktop,
    IconMoonFilled,
    IconSunFilled,
} from '@tabler/icons-react';

function ThemeButton() {
    const { colorScheme, setColorScheme } = useMantineColorScheme();

    return (
        <ActionIcon
            h="100%"
            w={60}
            bdrs={0}
            bg="none"
            c="indigo.7"
            onClick={() => {
                let newScheme: MantineColorScheme;
                switch (colorScheme) {
                    case 'light':
                        newScheme = 'dark'; break;
                    case 'dark':
                        newScheme = 'auto'; break;
                    case 'auto':
                        newScheme = 'light'; break;
                }
                setColorScheme(newScheme);
            }}
        >
            {colorScheme === 'light' ? (
                <IconSunFilled />
            ) : colorScheme === 'dark' ? (
                <IconMoonFilled />
            ) : (
                <IconDeviceDesktop />
            )}
        </ActionIcon>
    );
}

export default ThemeButton;
