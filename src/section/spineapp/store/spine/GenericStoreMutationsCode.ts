
import * as Data from '@/../src-gen/data';
import {GenericStoreMutations} from '@/../src-gen/store/spine-store-support';

export class GenericStoreMutationsCode implements GenericStoreMutations   {


    showConfirmation(state: Data.Spine.GenericStore, confirmationAlertInfo: Data.Spine.ConfirmationAlertInfo): void {
        state.confirmationAlertInfo = confirmationAlertInfo;
        // throw new Error('Method not implemented.');
    }

    hideConfirmation(state: Data.Spine.GenericStore): void {
        state.confirmationAlertInfo = new Data.Spine.ConfirmationAlertInfo();
    }

}

