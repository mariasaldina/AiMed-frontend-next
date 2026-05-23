import { makeAutoObservable } from 'mobx';
import { Invitation } from '@/entities/invitation/model/invitation.types';
import { RootStore } from '@/shared/stores';

export class InvitationState {
    invitations: Invitation[] = [];

    constructor(public root: RootStore) {
        makeAutoObservable(this);
    }
}
