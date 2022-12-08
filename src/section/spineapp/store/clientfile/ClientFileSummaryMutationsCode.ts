
import * as Data from '@/../src-gen/data';
import { ClientFileSummaryMutations } from '@/../src-gen/store/clientfile-store-support';

export class ClientFileSummaryMutationsCode implements ClientFileSummaryMutations {

  public updateFiCreditorInfo(state: Data.ClientFile.ClientFileSummary, fiCreditorInfo: Data.ClientFile.FiCreditorInfo | undefined): void {
    state.fiCreditorInfo = fiCreditorInfo
  }

  public updateFiBankInfo(state: Data.ClientFile.ClientFileSummary, fiBankInfo: Data.ClientFile.FiBankInfo | undefined): void {
    state.fiBankInfo = fiBankInfo
  }
  public updatePersonalInfo(state: Data.ClientFile.ClientFileSummary, personalInfo: Data.ClientFile.ClPersonalInfo | undefined): void {
    state.personalInfo = personalInfo
  }

  public updateClientFileBasicInfo(state: Data.ClientFile.ClientFileSummary, clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo): void {
    state.clientFileBasicInfo = clientFileBasicInfo
  }

  public updateFileSummary(state: Data.ClientFile.ClientFileSummary, fileSummary: Data.ClientFile.FileSummary): void {
    state.fileSummary = fileSummary
  }

  public updateFiDocumentList(state: Data.ClientFile.ClientFileSummary, fiDocumentList: Data.ClientFile.FiDocument[]): void {
    state.fiDocumentList = fiDocumentList
  }
  public updateFiPaymentPlan(state: Data.ClientFile.ClientFileSummary, fiPaymentPlanInfo: Data.ClientFile.FiPaymentPlanInfo | undefined): void {
    state.fiPaymentPlanInfo = fiPaymentPlanInfo;
  }

  public updateBudgetInfo(state: Data.ClientFile.ClientFileSummary, budgetInfo: Data.ClientFile.BudgetInfo | undefined): void {
    state.budgetInfo = budgetInfo;
  }

  public updateFiPaymentList(state: Data.ClientFile.ClientFileSummary, fiPaymentList: Data.ClientFile.FiPayment[]): void {
    state.fiPaymentList = fiPaymentList;
  }

  public updateFiPaymentTransactionList(state: Data.ClientFile.ClientFileSummary, fiPaymentTransactionList: Data.ClientFile.FiPaymentTransaction[]): void {
    state.fiPaymentTransactionList = fiPaymentTransactionList;
  }

  // public updateFiPaymentDetails(state: Data.ClientFile.ClientFileSummary, fiPaymentDetails: Data.ClientFile.FiPaymentDetails): void {
  //   state.fiPaymentDetails = fiPaymentDetails;
  // }
  
  public  updateFiEMandateList(state: Data.ClientFile.ClientFileSummary, fiEMandateList: Data.ClientFile.FiEMandateList[]): void {
    state.fiEMandateList = fiEMandateList;
  }

  public updateFiActiveEMandateList(state: Data.ClientFile.ClientFileSummary, fiActiveEMandateList: Data.ClientFile.FiActiveEMandateList[]): void {
    state.fiActiveEMandateList = fiActiveEMandateList;
  }

  public resetCFSummary(state: Data.ClientFile.ClientFileSummary): void {
    state.clientFileBasicInfo = new Data.ClientFile.ClientFileBasicInfo();
    state.personalInfo = new Data.ClientFile.ClPersonalInfo();
  }


}

