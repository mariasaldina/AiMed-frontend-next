import { observer } from 'mobx-react-lite';
import { Header } from './ui/Header';

const HeaderObserved = observer(Header);

export { HeaderObserved as Header };
