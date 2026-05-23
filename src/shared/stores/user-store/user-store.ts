import { RootStore } from '@/shared/stores';
import { UserState } from './model/user-state';
import { UserSync } from './model/user-sync';
import { UserAsync } from './model/user-async';

export class UserStore {
    state: UserState;
    sync: UserSync;
    async: UserAsync;

    constructor(root: RootStore) {
        this.state = new UserState(root);
        this.sync = new UserSync(root, this.state);
        this.async = new UserAsync(root, this.state, this.sync);
    }
}
