
import * as Data from '@/../src-gen/data';
import { MyClientFileStoreGetters } from '@/../src-gen/store/clientfile-store-support';

export class MyClientFileStoreInit {
  public static initState(): Data.ClientFile.MyClientFileStore { return new Data.ClientFile.MyClientFileStore(); }
}

export class MyClientFileStoreGettersCode implements MyClientFileStoreGetters {


  public myClientFileList(state: Data.ClientFile.MyClientFileStore): Data.ClientFile.MyClientFile[] {
    return state.myClientFileList
  }

  public myEMandatePendingCFList(state: Data.ClientFile.MyClientFileStore): Data.ClientFile.MyClientFile[] {
    return state.myEMandatePendingCFList;
  }
  public myEMandateActiveCFList(state: Data.ClientFile.MyClientFileStore): Data.ClientFile.MyClientFile[] {
    return state.myEMandateActiveCFList;
    
  }
  public myMSFPendingCFList(state: Data.ClientFile.MyClientFileStore): Data.ClientFile.MyClientFile[] {
    return state.myMSFPendingCFList;
  }
  public myMSFPaidCFList(state: Data.ClientFile.MyClientFileStore): Data.ClientFile.MyClientFile[] {
    return state.myMSFPaidCFList;
  }



  public clientFileDashboardSummary(state: Data.ClientFile.MyClientFileStore): Data.ClientFile.ClientFileDashboardSummary {
    const summary = state.clientFileDashboardSummary;
    summary.totalCount = state.myClientFileList.length
    summary.eMandateActiveCount = state.myEMandateActiveCFList.length
    summary.eMandatePendingCount = state.myEMandatePendingCFList.length
    summary.msfPaidCount = state.myMSFPaidCFList.length
    summary.msfPendingCount = state.myMSFPendingCFList.length
    return summary;
  }

}
