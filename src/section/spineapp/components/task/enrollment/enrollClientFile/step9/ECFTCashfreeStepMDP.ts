import FBtnMDP from "@/components/generic/FBtnMDP";
import FAgreementListMDP from "@/components/generic/file/agreementList/FAgreementListMDP";
import FCashfreeListMDP from "@/components/generic/file/cashfreeList/FCashfreeListMDP";
import BankInfoSummaryFFormMDP from "@/components/generic/file/summary/BankInfoSummaryFFormMDP";
import BudgetSummaryFFormMDP from "@/components/generic/file/summary/BudgetSummaryFFormMDP";
import CreditorSummaryFDataTableMDP from "@/components/generic/file/summary/CreditorSummaryFDataTableMDP";
import DocumentSummaryFFormMDP from "@/components/generic/file/summary/DocumentSummaryFFormMDP";
import PaymentPlanSummaryFFormMDP from "@/components/generic/file/summary/PaymentPlanSummaryFFormMDP";
import ProfileSummaryFFormMDP from "@/components/generic/file/summary/ProfileSummaryFFormMDP";
import StepSummaryMDP from "@/components/generic/file/summary/StepSummaryMDP";
import FFormMDP from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";



export default class ECFTCashfreeStepMDP extends FCashfreeListMDP {
    
    constructor({ taskRoot, parent }:{ taskRoot: any, parent: any }) {
        super({taskRoot, parent})
    }

}

