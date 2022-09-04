
import * as Data from '@/../src-gen/data';
import {ClientFileSummaryMutations} from '@/../src-gen/store/clientfile-store-support';

export class ClientFileSummaryMutationsCode implements ClientFileSummaryMutations   {
   updatePersonalInfo(state: Data.ClientFile.ClientFileSummary, personalInfo: Data.ClientFile.ClPersonalInfo | undefined): void {
     state.personalInfo  = personalInfo
   }
  

   public updateClientFileBasicInfo(state: Data.ClientFile.ClientFileSummary, clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo  ): void  {
     state.clientFileBasicInfo = clientFileBasicInfo
   }


}

