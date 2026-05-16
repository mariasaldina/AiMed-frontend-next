import { RootStore } from '..';
import { SettingsAsync } from './model/settings-async';
import { SettingsState } from './model/settings-state';
import { SettingsSync } from './model/settings-sync';

export class SettingsStore {
    state: SettingsState;
    sync: SettingsSync;
    async: SettingsAsync;

    constructor(public root: RootStore) {
        this.state = new SettingsState(root);
        this.sync = new SettingsSync(root, this.state);
        this.async = new SettingsAsync(root, this.state, this.sync);
    }
}
