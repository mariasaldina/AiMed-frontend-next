import { User } from '@/entities/user/model/user.types';
import { RootStore } from '@/stores';
import { makeAutoObservable } from 'mobx';

export class UserStore {
    root: RootStore;

    user: User | null = null;
    isInitialized: boolean = false;

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this);
    }

    setUser(user: User | null) {
        this.user = user;
        this.isInitialized = true;
    }
}
