
import * as Data from '@/../src-gen/data';
import {DCPClientFileSummaryGetters} from '@/../src-gen/store/dcpclientfile-store-support';

export class DCPClientFileSummaryInit {
    public static initState(): Data.DCPClientFile.DCPClientFileSummary  { return new Data.DCPClientFile.DCPClientFileSummary(); }
}

export class DCPClientFileSummaryGettersCode implements DCPClientFileSummaryGetters {



   public allAgreementList(state: Data.DCPClientFile.DCPClientFileSummary): Data.DCPClientFile.FiSSASummaryForDCP[] {
     return state.allAgreementList
   }

 public  dcpClientFileBasicInfo(state: Data.DCPClientFile.DCPClientFileSummary): Data.DCPClientFile.DCPClientFileBasicInfo  {
    return state.dcpClientFileBasicInfo
  }

}
