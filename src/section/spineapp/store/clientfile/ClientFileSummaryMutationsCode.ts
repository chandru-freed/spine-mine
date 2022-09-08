
import * as Data from '@/../src-gen/data';
import {ClientFileSummaryMutations} from '@/../src-gen/store/clientfile-store-support';

export class ClientFileSummaryMutationsCode implements ClientFileSummaryMutations   {
   public updateFiCreditorInfo(state: Data.ClientFile.ClientFileSummary, fiCreditorList: Data.ClientFile.FiCreditor[]): void {
     console.log("inside update Cred")
     state.fiCreditorList = fiCreditorList
   }
   public updateFiBankInfo(state: Data.ClientFile.ClientFileSummary, fiBankInfo: Data.ClientFile.FiBankInfo | undefined): void {
    state.fiBankInfo  = fiBankInfo
   }
   public updatePersonalInfo(state: Data.ClientFile.ClientFileSummary, personalInfo: Data.ClientFile.ClPersonalInfo | undefined): void {
     state.personalInfo  = personalInfo
   }
  
   public updateClientFileBasicInfo(state: Data.ClientFile.ClientFileSummary, clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo  ): void  {
     state.clientFileBasicInfo = clientFileBasicInfo
   }


}

