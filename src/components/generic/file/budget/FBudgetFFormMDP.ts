import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FDebtRepaymentsMiniFormMDP from "./FDebtRepaymentsMiniFormMDP";
import FIncomeSourcesFBudgetMiniFormMDP from "./FIncomeSourcesFBudgetMiniFormMDP";
import FLivingExpensesFBudgetMiniFormMDP from "./FLivingExpensesFBudgetMiniFormMDP";

export default class FBudgetFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent , disabled}: { taskRoot: any; parent: any, disabled: boolean }) {
    super({
      myRefName: "budgetFormRef",
      disabled: disabled,
      // dataSelectorKey: "budgetInfo"
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FIncomeSourcesFBudgetMiniFormMDP({taskRoot: this.taskRoot, parent: this})
    )
    .addField(
      new FDebtRepaymentsMiniFormMDP({taskRoot: this.taskRoot, parent: this})
    )
    .addField(
      new FLivingExpensesFBudgetMiniFormMDP({taskRoot: this.taskRoot, parent: this})
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
