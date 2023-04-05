
import * as Data from '@/../src-gen/data';
import {MyClientFileStoreMutations} from '@/../src-gen/store/clientfile-store-support';

export class MyClientFileStoreMutationsCode implements MyClientFileStoreMutations   {


   public updateMyClientFileList(state: Data.ClientFile.MyClientFileStore, myClientFileList: Data.ClientFile.MyClientFile[]  ): void  {
     state.myClientFileList = [...myClientFileList];
     state.myEMandateActiveCFList = [...myClientFileList].filter(myClientFile => myClientFile.eMandateActive === true);
     state.myEMandatePendingCFList = [...myClientFileList].filter(myClientFile => myClientFile.eMandateActive === false && myClientFile.clientFileStatus.name == "ACTIVE");
     state.myMSFPaidCFList = [...myClientFileList].filter(myClientFile => myClientFile.firstMSFPaid === true);
     state.myMSFPendingCFList = [...myClientFileList].filter(myClientFile => myClientFile.firstMSFPaid === false&&myClientFile.eMandateActive === true);
   }


}

