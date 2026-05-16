import { RootStore } from '@/stores';
import { UserState } from './user-state';
import { makeAutoObservable } from 'mobx';

export class UserSync {
    constructor(
        public root: RootStore,
        public state: UserState,
    ) {
        makeAutoObservable(this);
    }
}
