
import * as Data from '@/../src-gen/data';
import { MyClientFileStoreMutations } from '@/../src-gen/store/clientfile-store-support';

export class MyClientFileStoreMutationsCode implements MyClientFileStoreMutations {


  public updateMyClientFileList(state: Data.ClientFile.MyClientFileStore, myClientFileList: Data.ClientFile.MyClientFile[]): void {
    state.myClientFileList = [...myClientFileList];
    state.myEMandateActiveCFList = [...myClientFileList].filter(myClientFile => myClientFile.eMandateActive === true);
    state.myEMandatePendingCFList = [...myClientFileList].filter(myClientFile => myClientFile.eMandateActive === false
      && this.isEligibleForMandateMSFList(myClientFile));
    state.myMSFPaidCFList = [...myClientFileList].filter(myClientFile => myClientFile.firstMSFPaid === true);
    state.myMSFPendingCFList = [...myClientFileList].filter(myClientFile => myClientFile.firstMSFPaid === false
      && this.isEligibleForMandateMSFList(myClientFile)
    );
    state.myActiveCFList = [...myClientFileList].filter(myClientFile => myClientFile.clientFileStatus.id === Data.ClientFile.CLIENT_FILE_STATUS.ACTIVE.id);
    state.myAgreementCFList = [...myClientFileList].filter(myClientFile => myClientFile.clientFileStatus.id === Data.ClientFile.CLIENT_FILE_STATUS.AGREEMENT_SIGNED.id);
    state.myLeadCFList = [...myClientFileList].filter(myClientFile => myClientFile.clientFileStatus.id === Data.ClientFile.CLIENT_FILE_STATUS.LEAD.id);
    state.msfEMandateEligibleCFList = [...myClientFileList].filter(myClientFile => this.isEligibleForMandateMSFList(myClientFile))
    state.myHoldCFList = [...myClientFileList].filter(myClientFile => myClientFile.clientFileStatus.id === Data.ClientFile.CLIENT_FILE_STATUS.HOLD.id)
  }

  isEligibleForMandateMSFList(myClientFile: any) {
    return (myClientFile.clientFileStatus.name == Data.ClientFile.CLIENT_FILE_STATUS.ACTIVE.name ||
      myClientFile.clientFileStatus.name == Data.ClientFile.CLIENT_FILE_STATUS.AGREEMENT_SIGNED.name
      || myClientFile.clientFileStatus.name == Data.ClientFile.CLIENT_FILE_STATUS.HOLD.name
    )
  }


}

