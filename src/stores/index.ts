import { UserStore } from '@/stores/user.store';
import { SettingsStore } from './settings.store';

export class RootStore {
    userStore: UserStore;
    settingsStore: SettingsStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.settingsStore = new SettingsStore(this);
    }
}
