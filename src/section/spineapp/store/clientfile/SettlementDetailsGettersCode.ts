
import * as Data from '@/../src-gen/data';
import {SettlementDetailsGetters} from '@/../src-gen/store/clientfile-store-support';

export class SettlementDetailsInit {
    public static initState(): Data.ClientFile.SettlementDetails  { return new Data.ClientFile.SettlementDetails(); }
}

export class SettlementDetailsGettersCode implements SettlementDetailsGetters {


   public fiCreditorList(state: Data.ClientFile.SettlementDetails): Data.ClientFile.FiCreditorApprochingSettlement[] {
     return state.fiCreditorList
   }

}
