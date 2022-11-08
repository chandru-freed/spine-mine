
import * as Data from '@/../src-gen/data';
import {SettlementDetailsMutations} from '@/../src-gen/store/clientfile-store-support';

export class SettlementDetailsMutationsCode implements SettlementDetailsMutations   {


   public updateFiCreditorList(state: Data.ClientFile.SettlementDetails, fiCreditorList: Data.ClientFile.FiCreditorApprochingSettlement[]  ): void  {
     state.fiCreditorList = fiCreditorList;
   }


}

