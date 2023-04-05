
import * as Data from '@/../src-gen/data';
import {MyClientFileStoreGetters} from '@/../src-gen/store/clientfile-store-support';

export class MyClientFileStoreInit {
    public static initState(): Data.ClientFile.MyClientFileStore  { return new Data.ClientFile.MyClientFileStore(); }
}

export class MyClientFileStoreGettersCode implements MyClientFileStoreGetters {


   public myClientFileList(state: Data.ClientFile.MyClientFileStore): Data.ClientFile.MyClientFile[] {
     return state.myClientFileList
   }


   public clientFileDashboardSummary(state: Data.ClientFile.MyClientFileStore): Data.ClientFile.ClientFileDashboardSummary {
    const summary = state.clientFileDashboardSummary;
    summary.totalCount = state.myClientFileList.length
    return summary;
   }

}
