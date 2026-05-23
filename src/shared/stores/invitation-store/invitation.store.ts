import { InvitationState } from './model/invitation-state';
import { InvitationSync } from './model/invitation-sync';
import { InvitationAsync } from './model/invitation-async';
import { RootStore } from '..';

export class InvitationStore {
    state: InvitationState;
    sync: InvitationSync;
    async: InvitationAsync;

    constructor(public root: RootStore) {
        this.state = new InvitationState(root);
        this.sync = new InvitationSync(root, this.state);
        this.async = new InvitationAsync(root, this.state, this.sync);
    }
}
