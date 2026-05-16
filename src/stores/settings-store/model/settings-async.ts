import { RootStore } from '@/stores';
import { runInAction } from 'mobx';
import { SettingsState } from './settings-state';
import { SettingsSync } from './settings-sync';

export class SettingsAsync {
    constructor(
        public root: RootStore,
        public state: SettingsState,
        public sync: SettingsSync,
    ) {}

    async run<T>(key: string, fn: () => Promise<T>): Promise<T> {
        runInAction(() => (this.state.loading[key] = true));

        try {
            const res = await fn();

            runInAction(() => {
                this.state.loading[key] = false;
            });

            return res;
        } catch (e: any) {
            runInAction(() => {
                this.state.loading[key] = false;
                if (key !== 'user/getUser') {
                    this.state.errorModal = {
                        open: true,
                        message: e?.message ?? 'Unknown error',
                    };
                }
            });

            throw e;
        }
    }
}
