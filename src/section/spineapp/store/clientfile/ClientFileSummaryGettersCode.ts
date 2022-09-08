
import * as Data from '@/../src-gen/data';
import {ClientFileSummaryGetters} from '@/../src-gen/store/clientfile-store-support';

export class ClientFileSummaryInit {
    public static initState(): Data.ClientFile.ClientFileSummary  { return new Data.ClientFile.ClientFileSummary(); }
}

export class ClientFileSummaryGettersCode implements ClientFileSummaryGetters {
   public fiCreditorList(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.FiCreditor[] {
    console.log("inside getters Cred")
      return state.fiCreditorList
   }
   public fiBankInfo(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.FiBankInfo | undefined {
    return state.fiBankInfo
   }
   public personalInfo(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.ClPersonalInfo | undefined {
     return state.personalInfo
   }
   
   public clientFileBasicInfo(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.ClientFileBasicInfo {
     return state.clientFileBasicInfo
   }

}
