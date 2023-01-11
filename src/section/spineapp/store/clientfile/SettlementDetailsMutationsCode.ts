
import * as Data from '@/../src-gen/data';
import {SettlementDetailsMutations} from '@/../src-gen/store/clientfile-store-support';

export class SettlementDetailsMutationsCode implements SettlementDetailsMutations   {


   public updateFiCreditorList(state: Data.ClientFile.SettlementDetails, fiCreditorSettlementList: Data.ClientFile.FiCreditorApprochingSettlement[]  ): void  {
     state.fiCreditorSettlementList = fiCreditorSettlementList;
   }

   public updateFiSettlementPlan(state: Data.ClientFile.SettlementDetails, fiSettlementPlanList: Data.ClientFile.FiSettlementPlan[]): void {
     state.fiSettlementPlanList = fiSettlementPlanList;
   }
   public updateSTPlanDetails(state: Data.ClientFile.SettlementDetails, stPlanDetails: Data.ClientFile.STPlanDetails): void {
     state.stPlanDetails = stPlanDetails;
   }

}

