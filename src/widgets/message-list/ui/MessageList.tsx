'use client';

import { Flex } from '@mantine/core';
import { useStores } from '@/app/providers/StoreProvider';
import { observer } from 'mobx-react-lite';
import UserMessage from '@/entities/message/ui/UserMessage';
import AssistantMessage from '@/entities/message/ui/AssitantMessage';
import InvitationMessage from '@/entities/message/ui/InvitationMessage';
import FindDoctorsMessage from '@/features/find-doctors/ui/FindDoctorsMessage';

const MessageList = () => {
    const rootStores = useStores();
    const { messages } = rootStores.messageStore.state;

    return (
        <Flex
            direction={'column'}
            style={{ listStyle: 'none' }}
            pt="50"
            gap={{ base: 'md', sm: 'xl' }}
        >
            {messages.map((m) =>
                m.kind === 'user' ? (
                    <UserMessage key={m.id} content={m.content} />
                ) : m.kind === 'assistant' ? (
                    <AssistantMessage
                        key={m.id}
                        possibleCauses={m.possibleCauses}
                        recommendations={m.recommendations}
                        doctors={m.doctors}
                        urgency={m.urgency}
                    />
                ) : m.kind === 'doctorSuggestions' ? (
                    <FindDoctorsMessage key={m.id} doctors={m.doctors} />
                ) : m.kind === 'invitation' ? (
                    <InvitationMessage
                        key={m.id}
                        content={m.content}
                        fullName={m.doctorsFullName}
                    />
                ) : null,
            )}
        </Flex>
    );
};

export default observer(MessageList);
