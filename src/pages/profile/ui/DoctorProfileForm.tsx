import { MultiSelect, Textarea, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import * as z from 'zod';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { getSpecializationsList } from '@/entities/user/api';
import { useStores } from '@/shared/hooks/use-stores';
import {
    DoctorProfile,
    Specialization,
} from '@/entities/user/model/user.types';
import FormTemplate from '@/pages/profile/ui/FormTemplate';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

interface DoctorProfileFormProps {
    isEditing: boolean;
    onCancel: () => void;
}

const formSchema = z.object({
    fullName: z.string().min(1, 'Обязательное поле'),
    address: z.string().min(1, 'Обязательное поле'),
    education: z.string().min(1, 'Обязательное поле'),
    description: z.string().min(1, 'Обязательное поле'),
    practiceStartDate: z.coerce.date().nullable(),
    license: z.string().min(1, 'Обязательное поле'),
    licenseIssueDate: z.coerce.date().nullable(),
    licenseExpiryDate: z.coerce.date().nullable(),
    specializationIds: z
        .array(z.number())
        .min(1, 'Укажите хотя бы 1 специальность'),
});

type FormValues = z.infer<typeof formSchema>;

function DoctorProfileForm({ isEditing, onCancel }: DoctorProfileFormProps) {
    const rootStore = useStores();
    const { user } = rootStore.userStore.state;
    const { loading } = rootStore.settingsStore.state;

    if (user?.role !== 'DOCTOR') return null;
    const doctorProfile = user.profile as DoctorProfile;

    const [specializations, setSpecializations] = useState<Specialization[]>(
        [],
    );

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getSpecializationsList();
                setSpecializations(data);
            } catch (e) {
                setSpecializations([]);
                console.log(e);
            }
        };

        load();
    }, []);

    const form = useForm<FormValues>({
        initialValues: {
            fullName: '',
            address: '',
            education: '',
            description: '',
            practiceStartDate: null,
            license: '',
            licenseIssueDate: null,
            licenseExpiryDate: null,
            specializationIds: [],
        },
        validate: zod4Resolver(formSchema),
    });

    const resetForm = () => {
        const rawProfile = toJS(doctorProfile);
        form.setValues({
            fullName: user.fullName || '',
            address: rawProfile.address || '',
            education: rawProfile.education || '',
            description: rawProfile.description || '',
            practiceStartDate: rawProfile.practiceStartDate || null,
            license: rawProfile.license || '',
            licenseIssueDate: rawProfile.licenseIssueDate || null,
            licenseExpiryDate: rawProfile.licenseExpiryDate || null,
            specializationIds: rawProfile.specializationIds || [],
        });
    };

    const onSubmit = async (formData: FormValues) => {
        try {
            await rootStore.userStore.async.editDoctorProfile(
                formData.fullName,
                formData,
            );
            onCancel();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <FormTemplate
            onSubmit={form.onSubmit(onSubmit)}
            isEditing={isEditing}
            onCancel={onCancel}
            resetForm={resetForm}
            loadingIndicator={loading['user/editDoctorProfile']}
        >
            <TextInput
                placeholder="ФИО"
                label="ФИО"
                readOnly={!isEditing}
                {...form.getInputProps('fullName')}
            />
            <TextInput
                placeholder="адрес"
                label="Адрес проживания"
                readOnly={!isEditing}
                {...form.getInputProps('address')}
            />
            <Textarea
                placeholder="учебное заведение, специальность"
                label="Профильное образование"
                readOnly={!isEditing}
                {...form.getInputProps('education')}
                maxRows={4}
                autosize
            />
            <Textarea
                placeholder="навыки, компетенции и т.п."
                label="Описание"
                readOnly={!isEditing}
                {...form.getInputProps('description')}
                minRows={2}
                maxRows={10}
                autosize
            />
            <DateInput
                placeholder=""
                label="Дата начала практики"
                readOnly={!isEditing}
                {...form.getInputProps('practiceStartDate')}
            />
            <TextInput
                placeholder=""
                label="Лицензия"
                readOnly={!isEditing}
                {...form.getInputProps('license')}
            />
            <DateInput
                placeholder=""
                label="Дата выдачи лицензии"
                readOnly={!isEditing}
                {...form.getInputProps('licenseIssueDate')}
            />
            <DateInput
                placeholder=""
                label="Дата окончания действия лицензии"
                readOnly={!isEditing}
                {...form.getInputProps('licenseExpiryDate')}
            />
            <MultiSelect
                label="Медицинские специализации"
                placeholder="Выберите специализацию"
                searchable
                clearable
                nothingFoundMessage="Специализация не найдена"
                readOnly={!isEditing}
                data={specializations.map((s) => ({
                    value: s.id,
                    label: s.name,
                }))}
                {...form.getInputProps('specializationIds')}
            />
        </FormTemplate>
    );
}

export default observer(DoctorProfileForm);
