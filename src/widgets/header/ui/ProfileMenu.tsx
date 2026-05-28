'use client';

import { useStores } from '@/shared/hooks/use-stores';
import { Button, Menu, useMatches } from '@mantine/core';
import { IconLogout, IconUser } from '@tabler/icons-react';
import { Link } from '@/shared/config/i18n/navigation';
import { usePathname } from '@/shared/config/i18n/navigation';
import { useState } from 'react';

const ProfileMenu = () => {
    const isMobile = useMatches({ base: true, sm: false });
    const pathname = usePathname();
    if (!pathname) {
        return null;
    }

    const isActive = pathname.startsWith('/profile');

    const [opened, setOpened] = useState(false);

    const rootStore = useStores();

    return (
        <Menu
            shadow="md"
            width={200}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onOpen={() => setOpened(true)}
            onClose={() => setOpened(false)}
        >
            <Menu.Target>
                <Button
                    variant={isActive ? 'filled' : opened ? 'light' : 'subtle'}
                    leftSection={!isMobile ? <IconUser /> : null}
                    h="100%"
                    bdrs={0}
                >
                    {!isMobile ? 'Профиль' : <IconUser />}
                </Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item component={Link} href="/profile/questionnaire">
                    Профиль
                </Menu.Item>
                <Menu.Item component={Link} href="/profile/contacts">
                    Контакты
                </Menu.Item>
                <Menu.Item
                    rightSection={<IconLogout />}
                    onClick={() =>
                        rootStore.userStore.async
                            .logout()
                            .catch((e) => console.log(e))
                    }
                >
                    Выйти
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default ProfileMenu;
