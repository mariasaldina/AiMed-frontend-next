'use client';

import { useForm } from '@mantine/form';
import z from 'zod';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { Box, Button, Center, Stack, TextInput } from '@mantine/core';
import { useStores } from '@/shared/hooks/use-stores';
import EditableForm from '@/shared/ui/EditableForm';
import { IconEdit } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

const emailSchema = z
    .string()
    .trim()
    .transform((e) => (e === '' ? null : e))
    .refine(
        (e) => e === null || z.string().email().safeParse(e).success,
        'Невалидная почта',
    );

const phoneSchema = z
    .string()
    .trim()
    .transform((p) => (p === '' ? null : p))
    .refine(
        (p) => p === null || /^\+?\d{10,15}$/.test(p),
        'Невалидный номер телефона',
    );

const formSchema = z.object({
    email: emailSchema,
    phone: phoneSchema,
    messenger: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function Contacts() {
    const [isEditing, { open, close }] = useDisclosure(false);

    const rootStore = useStores();
    const { user } = rootStore.userStore.state;
    const { loading } = rootStore.settingsStore.state;

    const form = useForm<FormValues>({
        initialValues: {
            email: '',
            phone: '',
            messenger: '',
        },
        validate: zod4Resolver(formSchema),
    });

    const resetForm = () => {
        form.setValues({
            email: user?.contacts.email || '',
            phone: user?.contacts.phone || '',
            messenger: user?.contacts.messenger || '',
        });
    };

    const onSubmit = async (contacts: FormValues) => {
        try {
            await rootStore.userStore.async.updateContacts(contacts);
            close();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Center py={{ base: 'lg', sm: 'xl' }} h={'100%'}>
            <Stack h={'100%'} w={'100%'}>
                <Button
                    style={{ alignSelf: 'flex-end' }}
                    leftSection={<IconEdit />}
                    onClick={() => open()}
                    disabled={isEditing}
                >
                    Редактировать
                </Button>

                <Box flex={1} mih={0}>
                    <EditableForm
                        isEditing={isEditing}
                        onCancel={close}
                        resetForm={resetForm}
                        onSubmit={form.onSubmit(onSubmit)}
                        loadingIndicator={loading['user/updateContacts']}
                    >
                        <TextInput
                            label="Почта"
                            placeholder="example@mail.com"
                            readOnly={!isEditing}
                            {...form.getInputProps('email')}
                        />
                        <TextInput
                            label="Телефон"
                            placeholder="+7 (000) 000-00-00"
                            readOnly={!isEditing}
                            {...form.getInputProps('phone')}
                        />
                        <TextInput
                            label="Мессенджеры"
                            placeholder="например, tg: @user"
                            readOnly={!isEditing}
                            {...form.getInputProps('messenger')}
                        />
                    </EditableForm>
                </Box>
            </Stack>
        </Center>
    );
}
