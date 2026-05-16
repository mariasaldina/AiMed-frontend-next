import { getUser } from '@/entities/user/api';
import { logout } from '@/features/auth/api';
import { RootStore } from '@/stores';
import { runInAction } from 'mobx';
import { UserState } from './user-state';
import { UserSync } from './user-sync';

export class UserAsync {
    constructor(
        public root: RootStore,
        public state: UserState,
        public sync: UserSync,
    ) {}

    async setUser() {
        const fetched = await this.root.settingsStore.async.run(
            'user/getUser',
            getUser,
        );

        runInAction(() => {
            this.state.user = fetched;
            this.state.isInitialized = true;
        });
    }

    async logout() {
        await this.root.settingsStore.async.run('user/logout', logout);

        runInAction(() => {
            this.state.user = null;
            this.state.isInitialized = true;
        });
    }
}
