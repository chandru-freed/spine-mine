
import * as Data from '@/../src-gen/data';
import {ClientFileSummaryMutations} from '@/../src-gen/store/clientfile-store-support';

export class ClientFileSummaryMutationsCode implements ClientFileSummaryMutations   {
  
   public updateClientInfoOutput(state: Data.ClientFile.ClientFileSummary, clientInfoOutput: Data.ClientFile.ClientInfoOutput): void {
     state.clientInfoOutput = clientInfoOutput
   }


   public updateClientFileBasicInfo(state: Data.ClientFile.ClientFileSummary, clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo  ): void  {
     state.clientFileBasicInfo = clientFileBasicInfo
   }


}

