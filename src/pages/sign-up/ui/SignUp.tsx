'use client';

import * as z from 'zod';
import { useState } from 'react';
import {
    Button,
    Center,
    Group,
    PasswordInput,
    Radio,
    Stack,
    Stepper,
    TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { UserRole } from '@/shared/types/enums';
import Form from '@/shared/ui/Form';
import { useRouter } from '@/shared/config/i18n/navigation';
import { useStores } from '@/shared/hooks/use-stores';
import { observer } from 'mobx-react-lite';

const step1Schema = z.object({
    username: z.string().min(1, 'Обязательное поле'),
    password: z.string().min(8, 'Не менее 8 символов'),
});

const step2Schema = z.object({
    fullName: z.string().min(1, 'Обязательное поле'),
    role: z.enum(['DOCTOR', 'PATIENT']),
});

const signUpSchema = step1Schema.extend(step2Schema.shape);

type SignUpFormValues = z.infer<typeof signUpSchema>;

function SignUp() {
    const router = useRouter();

    const rootStore = useStores();
    const { loading } = rootStore.settingsStore.state;

    const [step, setStep] = useState(0);

    const nextStep = () => {
        if (step === 0) {
            const result = step1Schema.safeParse({
                username: form.values.username,
                password: form.values.password,
            });

            if (!result.success) {
                form.setErrors(result.error.flatten().fieldErrors);
                return;
            }
        }

        setStep((s) => s + 1);
    };

    const prevStep = () => {
        setStep((s) => s - 1);
    };

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
            fullName: '',
            role: 'PATIENT' as UserRole,
        },
        validate: zod4Resolver(signUpSchema),
    });

    const onSubmit = async (credentials: SignUpFormValues) => {
        try {
            await rootStore.userStore.async.signUp(credentials);
            router.push('/home');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Center pos="relative" h="100dvh" w="100dvw">
            <Form
                onSubmit={form.onSubmit(onSubmit)}
                title="Зарегистрироваться"
                gap={10}
            >
                <Stepper active={step}>
                    <Stepper.Step>
                        <Stack>
                            <TextInput
                                label="Username"
                                {...form.getInputProps('username')}
                                key={form.key('username')}
                            />
                            <PasswordInput
                                label="Пароль"
                                {...form.getInputProps('password')}
                                key={form.key('password')}
                            />

                            <Button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    nextStep();
                                }}
                            >
                                Далее
                            </Button>
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Step>
                        <Stack>
                            <TextInput
                                label="ФИО"
                                {...form.getInputProps('fullName')}
                                key={form.key('fullName')}
                            />
                            <Radio.Group
                                description="Роль"
                                {...form.getInputProps('role')}
                                key={form.key('role')}
                            >
                                <Group>
                                    <Radio
                                        label="пользователь"
                                        value="PATIENT"
                                    />
                                    <Radio
                                        label="медицинский специалист"
                                        value="DOCTOR"
                                    />
                                </Group>
                            </Radio.Group>

                            <Button
                                type="submit"
                                loading={loading['user/signUp']}
                            >
                                Зарегистрироваться
                            </Button>
                            <Button
                                type="button"
                                onClick={prevStep}
                                variant="light"
                            >
                                Назад
                            </Button>
                        </Stack>
                    </Stepper.Step>
                </Stepper>

                <Button
                    type="button"
                    onClick={() => router.push('/login')}
                    variant="outline"
                >
                    Уже есть аккаунт? Войти
                </Button>
            </Form>
        </Center>
    );
}

export const SignUpPage = observer(SignUp);
