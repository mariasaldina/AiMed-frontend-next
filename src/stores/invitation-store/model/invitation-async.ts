import { runInAction } from 'mobx';
import {
    cancelInvitation,
    getInvitations,
    sendDoctorsResponse,
} from '@/features/invitations/api/invitations';
import { InvitationState } from './invitation-state';
import { InvitationSync } from './invitation-sync';
import { RootStore } from '@/stores';

export class InvitationAsync {
    constructor(
        public root: RootStore,
        public state: InvitationState,
        public sync: InvitationSync,
    ) {}

    async loadInvitations() {
        const invitations = await this.root.settingsStore.async.run(
            'invitations/loadInvitations',
            getInvitations,
        );

        runInAction(() => {
            this.state.invitations = invitations;
        });
    }

    async sendDoctorsResponse(
        status: 'APPROVED' | 'REJECTED',
        invitationId: number,
    ) {
        await this.root.settingsStore.async.run(
            'invitations/sendDoctorsResponse',
            () => sendDoctorsResponse(status, invitationId),
        );

        runInAction(() => {
            this.state.invitations = this.state.invitations.map((n) =>
                n.id === invitationId ? { ...n, status } : n,
            );
        });
    }

    async cancelInvitation(invitationId: number) {
        await this.root.settingsStore.async.run(
            'invitations/cancelInvitation',
            () => cancelInvitation(invitationId),
        );

        runInAction(() => {
            this.state.invitations = this.state.invitations.map((n) =>
                n.id === invitationId ? { ...n, status: 'CANCELLED' } : n,
            );
        });
    }
}
