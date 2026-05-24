import { observer } from 'mobx-react-lite';
import { ChatWindow } from './ui/ChatWindow';

export { StartChatPage } from './ui/StartChatPage';
export { ChatLayout } from './ui/ChatLayout';
export const ChatPage = observer(ChatWindow);
