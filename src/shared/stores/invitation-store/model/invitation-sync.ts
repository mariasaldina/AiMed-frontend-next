import { RootStore } from '@/shared/stores';
import { InvitationState } from './invitation-state';
import { makeAutoObservable } from 'mobx';

export class InvitationSync {
    constructor(
        public root: RootStore,
        public state: InvitationState,
    ) {
        makeAutoObservable(this);
    }
}
