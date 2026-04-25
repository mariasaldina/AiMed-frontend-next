'use client';

import * as z from 'zod';
import { Button, Center, PasswordInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import Form from '@/shared/ui/Form';

const loginSchema = z.object({
    username: z.string().min(1, 'Обязательное поле'),
    password: z.string().min(1, 'Обязательное поле'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },
        validate: zod4Resolver(loginSchema),
    });

    const onSubmit = async (credentials: LoginFormValues) => {
        try {
            // fetch login api
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

                <Button type="submit">Войти</Button>

                <Button type="button" onClick={() => {}} variant="outline">
                    Впервые здесь? Регистрация
                </Button>
            </Form>
        </Center>
    );
}
