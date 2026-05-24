import { Stack } from '@mantine/core';
import FieldBlock from '@/shared/ui/FieldBlock';
import { Contacts } from '@/shared/types/contacts';

function ContactsCard({ contacts }: { contacts: Contacts | null | undefined }) {
    return (
        <Stack gap={15} p={'sm'}>
            <FieldBlock label="Почта" value={contacts?.email} />
            <FieldBlock label="Телефон" value={contacts?.phone} />
            <FieldBlock label="Мессенджер" value={contacts?.messenger} />
        </Stack>
    );
}

export default ContactsCard;
