import { observer } from 'mobx-react-lite';
import { SignUp } from './ui/SignUp';
import { Login } from './ui/Login';
import { ReverseAuthGuard } from './ui/ReverseAuthGuard';

export const SignUpPage = observer(SignUp);
export const LoginPage = observer(Login);
export const PublicWrapper = observer(ReverseAuthGuard);
