import { observer } from 'mobx-react-lite';
import { ChatNavbar } from './ui/ChatNavbar';

const ChatNavbarObserved = observer(ChatNavbar);

export { ChatNavbarObserved as ChatNavbar };
