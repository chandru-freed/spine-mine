
import * as Data from '@/../src-gen/data';
import {GenericStoreMutations} from '@/../src-gen/store/spine-store-support';

export class GenericStoreMutationsCode implements GenericStoreMutations   {

    showConfirmation(state: Data.Spine.GenericStore, confirmationAlertInfo: object): void {
        state.confirmationAlertInfo = confirmationAlertInfo;
        // throw new Error('Method not implemented.');
    }

}

