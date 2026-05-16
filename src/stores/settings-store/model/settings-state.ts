import { RootStore } from '@/stores';
import { makeAutoObservable } from 'mobx';
import { ErrorModal, Loading } from '../types';

export class SettingsState {
    loading: Loading = {};
    errorModal: ErrorModal = { open: false, message: null };

    constructor(public root: RootStore) {
        makeAutoObservable(this);
    }
}
