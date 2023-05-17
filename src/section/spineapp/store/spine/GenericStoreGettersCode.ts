
import * as Data from '@/../src-gen/data';
import {GenericStoreGetters} from '@/../src-gen/store/spine-store-support';

export class GenericStoreInit {
    public static initState(): Data.Spine.GenericStore  { return new Data.Spine.GenericStore(); }
}

export class GenericStoreGettersCode implements GenericStoreGetters {


   public confirmationAlertInfo(state: Data.Spine.GenericStore): Data.Spine.ConfirmationAlertInfo {
     return state.confirmationAlertInfo;
   }

}
