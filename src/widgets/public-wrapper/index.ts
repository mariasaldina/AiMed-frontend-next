import { observer } from 'mobx-react-lite';
import { ReverseAuthGuard } from './ui/ReverseAuthGuard';

export const PublicWrapper = observer(ReverseAuthGuard);
