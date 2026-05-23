import { observer } from 'mobx-react-lite';
import { Contacts } from './ui/Contacts';
import { Questionnaire } from './ui/Questionnaire';

export const ContactsPage = observer(Contacts);
export const QuestionnairePage = observer(Questionnaire);
export { EditableLayout } from './ui/EditableLayout';
