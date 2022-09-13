import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FTextareaMDP from "../../form/field/FTextareaMDP";
import FDebtRepaymentsMiniFormMDP from "./FDebtRepaymentsMiniFormMDP";
import FDependentExpensesFBudgetMiniFormMDP from "./FDependentExpensesFBudgetMiniFormMDP";
import FIncidentalExpensesFBudgetMiniFormMDP from "./FIncidentalExpensesFBudgetMiniFormMDP";
import FIncomeSourcesFBudgetMiniFormMDP from "./FIncomeSourcesFBudgetMiniFormMDP";
import FLifeStyleExpensesFBudgetMiniFormMDP from "./FLifeStyleExpensesFBudgetMiniFormMDP";
import FLivingExpensesFBudgetMiniFormMDP from "./FLivingExpensesFBudgetMiniFormMDP";
import FMiscExpensesFBudgetMiniFormMDP from "./FMiscExpensesFBudgetMiniFormMDP";

export default class FBudgetFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent, disabled }: { taskRoot: any; parent: any, disabled: boolean }) {
    super({
      myRefName: "budgetFormRef",
      disabled: disabled,
      // dataSelectorKey: "budgetInfo"
    });
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.addField(
      new FTextareaMDP({ parentMDP: this.childMDP, label:"Reason For Hardship", dataSelectorKey:"hardshipReason" })
    )
    this.addField(
      new FIncomeSourcesFBudgetMiniFormMDP({ taskRoot: this.taskRoot, parent: this })
    )
      .addField(
        new FDebtRepaymentsMiniFormMDP({ taskRoot: this.taskRoot, parent: this })
      )
      .addField(
        new FLivingExpensesFBudgetMiniFormMDP({ taskRoot: this.taskRoot, parent: this })
      ).addField(
        new FLifeStyleExpensesFBudgetMiniFormMDP({ taskRoot: this.taskRoot, parent: this })
      ).addField(
        new FDependentExpensesFBudgetMiniFormMDP({ taskRoot: this.taskRoot, parent: this })
      ).addField(
        new FIncidentalExpensesFBudgetMiniFormMDP({ taskRoot: this.taskRoot, parent: this })
      ).addField(
        new FMiscExpensesFBudgetMiniFormMDP({ taskRoot: this.taskRoot, parent: this})
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
