import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from '.';

type Loading = Record<string, boolean>;
type ErrorModal = { open: boolean; message: string | null };

export class SettingsStore {
    root: RootStore;

    loading: Loading = {};
    errorModal: ErrorModal = { open: false, message: null };

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this);
    }

    async run<T>(key: string, fn: () => Promise<T>): Promise<T> {
        this.loading[key] = true;

        try {
            const res = await fn();

            runInAction(() => {
                this.loading[key] = false;
            });

            return res;
        } catch (e: any) {
            runInAction(() => {
                this.loading[key] = false;
                this.errorModal = {
                    open: true,
                    message: e?.message ?? 'Unknown error',
                };
            });

            throw e;
        }
    }
}
