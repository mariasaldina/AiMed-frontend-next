import { Stack, Text } from '@mantine/core';
import { IconGenderFemale, IconGenderMale } from '@tabler/icons-react';
import { getYears } from '@/shared/lib/display-time';
import FieldBlock from '@/shared/ui/FieldBlock';
import { PatientCardType } from '../model/invitation.types';

function PatientCard({ patient }: { patient: PatientCardType }) {
    return (
        <Stack gap={'sm'}>
            <Text fw={600} fz={{ base: 'md', sm: 'lg' }}>
                {patient.fullName}
            </Text>

            <FieldBlock label={'Адрес'} value={patient.address} />

            <FieldBlock
                label={'Возраст'}
                value={`${getYears(patient.birthdate)} лет`}
            />

            <FieldBlock
                label={'Пол'}
                value={patient.gender === 'FEMALE' ? 'женский' : 'мужской'}
            >
                {patient.gender === 'FEMALE' && <IconGenderFemale />}
                {patient.gender === 'MALE' && <IconGenderMale />}
            </FieldBlock>

            <FieldBlock
                label={'История болезни'}
                value={patient.medicalHistory}
            />
        </Stack>
    );
}

export default PatientCard;
