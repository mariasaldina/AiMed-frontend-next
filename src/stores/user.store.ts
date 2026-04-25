import { RootStore } from '@/stores';
import { makeAutoObservable } from 'mobx';

export class UserStore {
    root: RootStore;

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this);
    }
}
