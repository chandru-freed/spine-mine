
import * as Data from '@/../src-gen/data';
import { ClientFileSummaryGetters } from '@/../src-gen/store/clientfile-store-support';

export class ClientFileSummaryInit {
  public static initState(): Data.ClientFile.ClientFileSummary { return new Data.ClientFile.ClientFileSummary(); }
}

export class ClientFileSummaryGettersCode implements ClientFileSummaryGetters {

  public fiCreditorInfo(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.FiCreditorInfo | undefined {
    const fiCreditorInfo: any = state.fiCreditorInfo || new Data.ClientFile.FiCreditorInfo();
    // fiCreditorInfo.creditorList = state.fiCreditorInfo?.creditorList.filter(creditor => creditor.ineligible == false)
    // fiCreditorInfo.includedCreditorList = state.fiCreditorInfo?.creditorList;
    return fiCreditorInfo
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

  public fiPaymentList(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.FiPayment[] {
    return state.fiPaymentList
  }

  public fiPaymentTransactionList(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.FiPaymentTransaction[] {
    return state.fiPaymentTransactionList
  }

  // public fiPaymentDetails(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.FiPaymentDetails {
  //   return state.fiPaymentDetails
  // }

  public fiEnrollmentDetails(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.FiEnrollmentDetails {
    return new Data.ClientFile.FiEnrollmentDetails(state.personalInfo, state.fiBankInfo, state.fiCreditorInfo, state.fiDocumentList, state.fiPaymentPlanInfo, state.budgetInfo)
  }

  public fiEMandateList(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.FiEMandateList[] {
    return state.fiEMandateList
  }

  public fiActiveEMandateList(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.FiActiveEMandateList[] {
    return state.fiActiveEMandateList
  }

  public showAmeyoSideBar(state: Data.ClientFile.ClientFileSummary): boolean {
    return state.showAmeyoSideBar
  }

  public fiSignAgreementList(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.FiSSASummary[] {
    return state.fiSignAgreementList
  }

  public fiEMandateSummaryList(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.FiEMandateSummary[] {
    return state.fiEMandateSummaryList
  }

  public fiERPDocumentList(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.FiDocument[] {
    return state.fiERPDocumentList;
  }

 public fiCashfreeLinkList(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.FiCashfreeLinkPayment[] {
    return state.fiCashfreeLinkList;
  }

 public fiClientFileEnrollmentSummary(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.ClientFileEnrollmentSummary {
    return state.fiClientFileEnrollmentSummary;
  }

  public clCreditorList(state: Data.ClientFile.ClientFileSummary): Data.ClientFile.ClCreditor[] {
    return state.clCreditorList;
  }

}


