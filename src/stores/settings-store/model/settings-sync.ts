import { RootStore } from '@/stores';
import { SettingsState } from './settings-state';
import { makeAutoObservable } from 'mobx';

export class SettingsSync {
    constructor(
        public root: RootStore,
        public state: SettingsState,
    ) {
        makeAutoObservable(this);
    }

    clearError() {
        this.state.errorModal = { open: false, message: null };
    }
}
