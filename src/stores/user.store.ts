import { getUser } from '@/entities/user/api';
import { User } from '@/entities/user/model/user.types';
import { logout } from '@/features/auth/api';
import { RootStore } from '@/stores';
import { makeAutoObservable, runInAction } from 'mobx';

export class UserStore {
    root: RootStore;

    user: User | null = null;
    isInitialized: boolean = false;

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this);
    }

    async setUser() {
        const fetched = await this.root.settingsStore.run(
            'user/getUser',
            getUser,
        );

        runInAction(() => {
            this.user = fetched;
            this.isInitialized = true;
        });
    }

    async logout() {
        await this.root.settingsStore.run('user/logout', logout);

        runInAction(() => {
            this.user = null;
            this.isInitialized = true;
        });
    }
}
