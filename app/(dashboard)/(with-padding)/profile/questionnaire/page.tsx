'use client';

import { Metadata } from 'next';
import { QuestionnairePage } from '@/pages/profile';

export const questionnaireMetadata: Metadata = {
    title: 'Анкета',
    description: 'Страница редактирования анкеты пользователя',
};

export default function Page() {
    return <QuestionnairePage />;
}
