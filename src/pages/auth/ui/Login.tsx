'use client';

import * as z from 'zod';
import { Button, Center, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import Form from '@/shared/ui/Form';
import { useRouter } from 'next/navigation';
import { useStores } from '@/shared/hooks/use-stores';

const loginSchema = z.object({
    username: z.string().min(1, 'Обязательное поле'),
    password: z.string().min(1, 'Обязательное поле'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function Login() {
    const router = useRouter();

    const rootStore = useStores();
    const { loading } = rootStore.settingsStore.state;

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
        validate: zod4Resolver(loginSchema),
    });

    const onSubmit = async (credentials: LoginFormValues) => {
        try {
            await rootStore.userStore.async.login(credentials);
            router.push('/home');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Center pos="relative" h="100dvh" w="100dvw">
            <Form onSubmit={form.onSubmit(onSubmit)} title="Войти">
                <TextInput
                    label="Username"
                    {...form.getInputProps('username')}
                />
                <PasswordInput
                    label="Пароль"
                    {...form.getInputProps('password')}
                />

                <Button type="submit" loading={loading['user/login']}>
                    Войти
                </Button>

                <Button
                    type="button"
                    onClick={() => router.push('/sign-up')}
                    variant="outline"
                >
                    Впервые здесь? Регистрация
                </Button>
            </Form>
        </Center>
    );
}
