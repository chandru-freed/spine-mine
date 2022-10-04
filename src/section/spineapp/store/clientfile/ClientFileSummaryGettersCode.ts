
import * as Data from '@/../src-gen/data';
import {ClientFileSummaryGetters} from '@/../src-gen/store/clientfile-store-support';

export class ClientFileSummaryInit {
    public static initState(): Data.ClientFile.ClientFileSummary  { return new Data.ClientFile.ClientFileSummary(); }
}

export class ClientFileSummaryGettersCode implements ClientFileSummaryGetters {

   public fiCreditorInfo(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.FiCreditorInfo | undefined {
      return state.fiCreditorInfo
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

   public fileSummary(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.FileSummary | undefined {
    return state.fileSummary
  }
  public fiPaymentPlanInfo(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.FiPaymentPlanInfo | undefined {
    return state.fiPaymentPlanInfo
  }

  public budgetInfo(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.BudgetInfo | undefined {
    return state.budgetInfo
  }

  public fiDocumentList(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.FiDocument[] {
    return state.fiDocumentList
  }
}


