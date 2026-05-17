import { RootStore } from '@/stores';
import { SettingsState } from './settings-state';
import { SettingsSync } from './settings-sync';

export class SettingsAsync {
    constructor(
        public root: RootStore,
        public state: SettingsState,
        public sync: SettingsSync,
    ) {}
}
