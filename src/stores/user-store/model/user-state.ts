import { User } from '@/entities/user/model/user.types';
import { RootStore } from '@/stores';
import { makeAutoObservable } from 'mobx';

export class UserState {
    user: User | null = null;
    isInitialized: boolean = false;

    constructor(public root: RootStore) {
        makeAutoObservable(this);
    }
}
