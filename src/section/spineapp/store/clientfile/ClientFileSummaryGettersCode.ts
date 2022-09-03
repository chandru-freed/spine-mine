
import * as Data from '@/../src-gen/data';
import {ClientFileSummaryGetters} from '@/../src-gen/store/clientfile-store-support';

export class ClientFileSummaryInit {
    public static initState(): Data.ClientFile.ClientFileSummary  { return new Data.ClientFile.ClientFileSummary(); }
}

export class ClientFileSummaryGettersCode implements ClientFileSummaryGetters {
   public clientInfoOutput(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.ClientInfoOutput {
     return state.clientInfoOutput
   }


   public clientFileBasicInfo(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.ClientFileBasicInfo {
     return state.clientFileBasicInfo
   }

}
