'use client';

import { Burger, Flex, Indicator } from '@mantine/core';
import {
    IconBell,
    IconHome,
    IconLogin,
    IconMessage2,
    IconStethoscope,
    IconUserPlus,
} from '@tabler/icons-react';
import HeaderItem from './HeaderItem';
import { useStores } from '@/shared/hooks/use-stores';
import ProfileMenu from './ProfileMenu';
import ThemeButton from './ThemeButton';
import { observer } from 'mobx-react-lite';
import LocaleButton from './LocaleButton';

interface HeaderProps {
    navbarOpened: boolean;
    showNavbar: boolean;
    toggleNavbar: () => void;
}

function Header({ navbarOpened, showNavbar, toggleNavbar }: HeaderProps) {
    const rootStore = useStores();
    const { user } = rootStore.userStore.state;
    const { unread } = rootStore.notificationStore.state;

    const hasUnread = unread.length !== 0;

    return (
        <Flex
            h={'100%'}
            w={'100%'}
            align={'center'}
            px={{ base: 'xs', sm: 'md' }}
        >
            {showNavbar && (
                <Burger
                    opened={navbarOpened}
                    onClick={toggleNavbar}
                    size="sm"
                    pos={'absolute'}
                />
            )}
            <Flex
                justify={'center'}
                gap={{ base: 5, sm: 40 }}
                w="100%"
                h="100%"
            >
                <HeaderItem to="/home" label="Главная" icon={<IconHome />} />
                {user && user.role === 'PATIENT' && (
                    <HeaderItem
                        to="/chats"
                        label="Чаты"
                        icon={<IconMessage2 />}
                    />
                )}
                {user && (
                    <HeaderItem
                        to="/invitations"
                        label={
                            user.role === 'PATIENT' ? 'Специалисты' : 'Пациенты'
                        }
                        icon={<IconStethoscope />}
                    />
                )}
                {user && (
                    <HeaderItem
                        to="/notifications"
                        label="Уведомления"
                        icon={
                            <Indicator
                                disabled={!hasUnread}
                                color="red"
                                size={12}
                                offset={4}
                                withBorder
                            >
                                <IconBell />
                            </Indicator>
                        }
                    />
                )}
                {user && <ProfileMenu />}
                {!user && (
                    <HeaderItem to="/login" label="Вход" icon={<IconLogin />} />
                )}
                {!user && (
                    <HeaderItem
                        to="/sign-up"
                        label="Регистрация"
                        icon={<IconUserPlus />}
                    />
                )}
                <ThemeButton />
                <LocaleButton />
            </Flex>
        </Flex>
    );
}

export const HeaderObserved = observer(Header);
