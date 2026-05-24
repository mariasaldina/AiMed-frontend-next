import { observer } from 'mobx-react-lite';
import { AuthGuard } from './ui/AuthGuard';

export const AuthWrapper = observer(AuthGuard);
