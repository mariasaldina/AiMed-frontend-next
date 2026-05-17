import {
    editDoctorProfile,
    editPatientProfile,
    getUser,
    updateContacts,
} from '@/entities/user/api';
import { login, logout, signUp } from '@/features/auth/api';
import { RootStore } from '@/stores';
import { runInAction } from 'mobx';
import { UserState } from './user-state';
import { UserSync } from './user-sync';
import {
    LoginCredentialsDto,
    SignUpCredentialsDto,
} from '@/features/auth/api/dtos';
import {
    Contacts,
    DoctorProfile,
    PatientProfile,
} from '@/entities/user/model/user.types';

export class UserAsync {
    constructor(
        public root: RootStore,
        public state: UserState,
        public sync: UserSync,
    ) {}

    async login(credentials: LoginCredentialsDto) {
        try {
            this.root.settingsStore.sync.startLoading('user/login');
            await login(credentials);
            await this.setUser();
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
        } finally {
            this.root.settingsStore.sync.stopLoading('user/login');
        }
    }

    async signUp(credentials: SignUpCredentialsDto) {
        try {
            this.root.settingsStore.sync.startLoading('user/signUp');
            await signUp(credentials);
            await this.setUser();
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
        } finally {
            this.root.settingsStore.sync.stopLoading('user/signUp');
        }
    }

    async setUser() {
        try {
            this.root.settingsStore.sync.startLoading('user/setUser');
            const fetched = await getUser();

            if (fetched) {
                this.root.notificationStore.async.loadNotifications();
            }

            runInAction(() => {
                this.state.user = fetched;
                this.state.isInitialized = true;
            });
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
        } finally {
            this.root.settingsStore.sync.stopLoading('user/setUser');
        }
    }

    async logout() {
        try {
            this.root.settingsStore.sync.startLoading('user/logout');
            await logout();

            runInAction(() => {
                this.state.user = null;
                this.state.isInitialized = true;
            });
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
        } finally {
            this.root.settingsStore.sync.stopLoading('user/logout');
        }
    }

    async editDoctorProfile(fullName: string, profile: DoctorProfile) {
        try {
            this.root.settingsStore.sync.startLoading('user/editDoctorProfile');
            const edited = await editDoctorProfile(fullName, profile);

            runInAction(() => {
                this.state.user = edited;
            });
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
        } finally {
            this.root.settingsStore.sync.stopLoading('user/editDoctorProfile');
        }
    }

    async editPatientProfile(fullName: string, profile: PatientProfile) {
        try {
            this.root.settingsStore.sync.startLoading(
                'user/editPatientProfile',
            );
            const edited = await editPatientProfile(fullName, profile);

            runInAction(() => {
                this.state.user = edited;
            });
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
        } finally {
            this.root.settingsStore.sync.stopLoading('user/editPatientProfile');
        }
    }

    async updateContacts(contacts: Contacts) {
        try {
            this.root.settingsStore.sync.startLoading('user/updateContacts');
            await updateContacts(contacts);

            runInAction(() => {
                if (!this.state.user) return;
                this.state.user = { ...this.state.user, contacts };
            });
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
        } finally {
            this.root.settingsStore.sync.stopLoading('user/updateContacts');
        }
    }
}
