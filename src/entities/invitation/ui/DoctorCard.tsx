import { Divider, Group, Pill, Stack, Text } from '@mantine/core';
import { getYears } from '@/shared/lib/display-time';
import FieldBlock from '@/shared/ui/FieldBlock';
import { DoctorCardType } from '../model/invitation.types';

function DoctorCard({ doctor }: { doctor: DoctorCardType }) {
    return (
        <Stack gap={'sm'}>
            <Text fw={600} fz={{ base: 'md', sm: 'lg' }}>
                {doctor.fullName}
            </Text>

            <FieldBlock
                label="Стаж"
                value={`${getYears(doctor.practiceStartDate)} лет`}
            />

            <Divider />

            <FieldBlock label="Адрес" value={doctor.address} />
            <FieldBlock label="Образование" value={doctor.education} />
            <FieldBlock label="Описание" value={doctor.description} />

            <Divider />

            <FieldBlock label="Специальности">
                <Group gap={6}>
                    {doctor.specializations.map((spec) => (
                        <Pill key={spec}>{spec}</Pill>
                    ))}
                </Group>
            </FieldBlock>
        </Stack>
    );
}

export default DoctorCard;
