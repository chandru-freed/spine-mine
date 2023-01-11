import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FDateFieldMDP from "@/components/generic/form/field/FDateFieldMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import FTextareaMDP from "../../form/field/FTextareaMDP";
import FDebtRepaymentsMiniFormMDP from "./FDebtRepaymentsMiniFormMDP";
import FDependentExpensesFBudgetMiniFormMDP from "./FDependentExpensesFBudgetMiniFormMDP";
import FHardshipReasonFMiniFormMDP from "./FHardshipReasonFMiniFormMDP";
import FIncidentalExpensesFBudgetMiniFormMDP from "./FIncidentalExpensesFBudgetMiniFormMDP";
import FIncomeSourcesFBudgetMiniFormMDP from "./FIncomeSourcesFBudgetMiniFormMDP";
import FLifeStyleExpensesFBudgetMiniFormMDP from "./FLifeStyleExpensesFBudgetMiniFormMDP";
import FLivingExpensesFBudgetMiniFormMDP from "./FLivingExpensesFBudgetMiniFormMDP";
import FMiscExpensesFBudgetMiniFormMDP from "./FMiscExpensesFBudgetMiniFormMDP";
import FPersonalFMiniFormMDP from "./FPersonalFMiniFormMDP";

export default class FBudgetFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({
    taskRoot,
    parent,
    disabled,
  }: {
    taskRoot: any;
    parent: any;
    disabled: boolean;
  }) {
    super({
      myRefName: "budgetFormRef",
      disabled: disabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.addField(
      new FPersonalFMiniFormMDP({ taskRoot: this.taskRoot, parent: this })
    ).addField(
      new FHardshipReasonFMiniFormMDP({
        taskRoot: this.taskRoot,
        parent: this,
      })
    );

    this.addField(
      new FIncomeSourcesFBudgetMiniFormMDP({
        taskRoot: this.taskRoot,
        parent: this,
      })
    )
      .addField(
        new FDebtRepaymentsMiniFormMDP({
          taskRoot: this.taskRoot,
          parent: this,
        })
      )
      .addField(
        new FLivingExpensesFBudgetMiniFormMDP({
          taskRoot: this.taskRoot,
          parent: this,
        })
      )
      .addField(
        new FLifeStyleExpensesFBudgetMiniFormMDP({
          taskRoot: this.taskRoot,
          parent: this,
        })
      )
      .addField(
        new FDependentExpensesFBudgetMiniFormMDP({
          taskRoot: this.taskRoot,
          parent: this,
        })
      )
      .addField(
        new FIncidentalExpensesFBudgetMiniFormMDP({
          taskRoot: this.taskRoot,
          parent: this,
        })
      )
      .addField(
        new FMiscExpensesFBudgetMiniFormMDP({
          taskRoot: this.taskRoot,
          parent: this,
        })
      );
  }

  getMyRef() {
    return this.parent.getMyRef()[0].$refs[this.myRefName];
  }
}
