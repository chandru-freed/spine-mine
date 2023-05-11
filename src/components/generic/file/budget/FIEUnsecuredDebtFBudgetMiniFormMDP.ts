import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FBudgetMiniFormMDP from "@/components/generic/form/field/FBudgetMiniFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";

export default class FIEUnsecuredDebtFBudgetMiniFormMDP extends FBudgetMiniFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      parentMDP: new FFormChildMDP(),
      dataSelectorKey: "taskOutput.budgetInfo.ineligibleUnsecuredDebt",
      disabled: taskRoot.taskDisabled,
      label: "Ineligible Unsecured Debt",
      boundaryClass: "col-12",
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "personalLoanDebt",
        label: "PersonalLoan Debt",
        boundaryClass: "col",
        hideDetails: true,
        readonly: true
      })
    )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "creditCardDebt",
          label: "CreditCard Debt",
          boundaryClass: "col",
          hideDetails: true,
          readonly: true
        })
      );
  }
}
