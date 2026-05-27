import { Metadata } from 'next';
import { QuestionnairePage } from '@/pages/questionnaire';

export const metadata: Metadata = {
    title: 'Анкета',
    description: 'Страница редактирования анкеты пользователя',
};

export default function Page() {
    return <QuestionnairePage />;
}
