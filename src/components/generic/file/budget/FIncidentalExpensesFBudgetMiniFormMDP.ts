import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FBudgetMiniFormMDP from "@/components/generic/form/field/FBudgetMiniFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";

export default class FIncidentalExpensesFBudgetMiniFormMDP extends FBudgetMiniFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      parentMDP: new FFormChildMDP(),
      dataSelectorKey: "incidentalExpenses",
      disabled: taskRoot.taskDisabled,
      label: "Incidental Expenses",
      mandatory: true,
      boundaryClass: "col-4",
      minHeight: "645"
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "healthInsuranceExpense",
        label: "Health Insurance Expense",
        mandatory: true,
      })
    )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "vehicleInsuranceExpense",
          label: "Vehicle Insurance Expense",
          mandatory: true,
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "sipExpense",
          label: "SIP Expense",
          mandatory: true,
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "stockTradesExpense",
          label: "Stock Trades Expense",
          mandatory: true,
        })
      ).addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "otherExpense",
          label: "Other Expense",
          mandatory: true,
        })
      )
  }
}
