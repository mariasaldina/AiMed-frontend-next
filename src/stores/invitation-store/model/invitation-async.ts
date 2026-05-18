import { runInAction } from 'mobx';
import { cancelInvitation } from '@/features/cancel-invitation/api';
import { InvitationState } from './invitation-state';
import { InvitationSync } from './invitation-sync';
import { RootStore } from '@/stores';
import { getInvitations } from '@/entities/invitation/api';
import { sendDoctorsResponse } from '@/features/send-doctors-response/api';
import { inviteDoctor } from '@/features/invite-doctor/api';

export class InvitationAsync {
    constructor(
        public root: RootStore,
        public state: InvitationState,
        public sync: InvitationSync,
    ) {}

    async inviteDoctor(chatId: number, doctorId: number, content: string) {
        try {
            this.root.settingsStore.sync.startLoading(
                'invitations/inviteDoctor',
            );
            const message = await inviteDoctor(chatId, doctorId, content);

            runInAction(() => {
                this.root.chatStore.sync.moveToTop(chatId);
                this.root.messageStore.sync.addMessage(message);
            });

            console.log('invited: ', doctorId);
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
            throw e;
        } finally {
            this.root.settingsStore.sync.stopLoading(
                'invitations/inviteDoctor',
            );
        }
    }

    async loadInvitations() {
        try {
            this.root.settingsStore.sync.startLoading(
                'invitations/loadInvitations',
            );
            const invitations = await getInvitations();

            runInAction(() => {
                this.state.invitations = invitations;
            });
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
            throw e;
        } finally {
            this.root.settingsStore.sync.stopLoading(
                'invitations/loadInvitations',
            );
        }
    }

    async sendDoctorsResponse(
        status: 'APPROVED' | 'REJECTED',
        invitationId: number,
    ) {
        try {
            this.root.settingsStore.sync.startLoading(
                'invitations/sendDoctorsResponse',
            );
            await sendDoctorsResponse(status, invitationId);

            runInAction(() => {
                this.state.invitations = this.state.invitations.map((n) =>
                    n.id === invitationId ? { ...n, status } : n,
                );
            });
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
            throw e;
        } finally {
            this.root.settingsStore.sync.stopLoading(
                'invitations/sendDoctorsResponse',
            );
        }
    }

    async cancelInvitation(invitationId: number) {
        try {
            this.root.settingsStore.sync.startLoading(
                'invitations/cancelInvitation',
            );
            await cancelInvitation(invitationId);

            runInAction(() => {
                this.state.invitations = this.state.invitations.map((n) =>
                    n.id === invitationId ? { ...n, status: 'CANCELLED' } : n,
                );
            });
        } catch (e: any) {
            this.root.settingsStore.sync.setError(e.message);
            throw e;
        } finally {
            this.root.settingsStore.sync.stopLoading(
                'invitations/cancelInvitation',
            );
        }
    }
}
