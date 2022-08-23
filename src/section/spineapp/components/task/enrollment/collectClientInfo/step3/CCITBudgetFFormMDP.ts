import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import { CollectClientInfoTaskIntf } from "../CollectClientInfoTaskIntf";
import CCITDebtRepaymentsMiniFormMDP from "./CCITDebtRepaymentsMiniFormMDP";
import CCITIncomeSourcesFBudgetMiniFormMDP from "./CCITIncomeSourcesFBudgetMiniFormMDP";
import CCITLivingExpensesFBudgetMiniFormMDP from "./CCITLivingExpensesFBudgetMiniFormMDP";

export default class CCITBudgetFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: CollectClientInfoTaskIntf;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: CollectClientInfoTaskIntf; parent: any }) {
    super({
      myRefName: "budgetFormRef",
      disabled: taskRoot.taskDisabled,
      // dataSelectorKey: "budgetInfo"
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new CCITIncomeSourcesFBudgetMiniFormMDP({taskRoot: this.taskRoot, parent: this})
    )
    .addField(
      new CCITDebtRepaymentsMiniFormMDP({taskRoot: this.taskRoot, parent: this})
    )
    .addField(
      new CCITLivingExpensesFBudgetMiniFormMDP({taskRoot: this.taskRoot, parent: this})
    )
  }

  getMyRef() {
    return this.parent.getMyRef()[0].$refs[this.myRefName]
  }

  submitAddCreditor() {
    return () => {
      this.getMyRef().submitForm(() => {
        this.parent.getMyRef()[0].addCreditorData();
      });
    }
  }

  closeAddForm() {
    this.parent.getMyRef()[0].closeAndClearAllForms();
  }

}
