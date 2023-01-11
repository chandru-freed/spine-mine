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
      dataSelectorKey: "taskOutput.budgetInfo.incidentalExpenses",
      disabled: taskRoot.taskDisabled,
      label: "Incidental Expenses",
      boundaryClass: "col-12",
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "healthInsuranceExpense",
        label: "Health Insurance",
        boundaryClass: "col",
        hideDetails: true
      })
    )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "vehicleInsuranceExpense",
          label: "Vehicle Insurance",
          boundaryClass: "col",
          hideDetails: true
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "sipExpense",
          label: "SIP",
          boundaryClass: "col",
          hideDetails: true
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "stockTradesExpense",
          label: "Stock Trades",
          boundaryClass: "col",
          hideDetails: true
        })
      ).addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "otherExpense",
          label: "Other",
          boundaryClass: "col",
          hideDetails: true
        })
      )
  }
}
