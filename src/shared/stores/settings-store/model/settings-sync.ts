import { RootStore } from '@/shared/stores';
import { SettingsState } from './settings-state';
import { makeAutoObservable } from 'mobx';

export class SettingsSync {
    constructor(
        public root: RootStore,
        public state: SettingsState,
    ) {
        makeAutoObservable(this);
    }

    startLoading(key: string) {
        this.state.loading[key] = true;
    }

    stopLoading(key: string) {
        this.state.loading[key] = false;
    }

    setError(message: string) {
        this.state.errorModal = { open: true, message };
    }

    clearError() {
        this.state.errorModal = { open: false, message: null };
    }
}
