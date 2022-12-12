import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FBudgetMiniFormMDP from "@/components/generic/form/field/FBudgetMiniFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";

export default class FLivingExpensesFBudgetMiniFormMDP extends FBudgetMiniFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      parentMDP: new FFormChildMDP(),
      dataSelectorKey: "livingExpenses",
      disabled: taskRoot.taskDisabled,
      label: "Living Expenses",
      mandatory: true,
      boundaryClass: "col-12",
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "rentMaintenance",
        label: "Rent / Maintenance",
        mandatory: true,
        boundaryClass: "col",
      })
    )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "groceryExpense",
          label: "Grocery Expense",
          mandatory: true,
          boundaryClass: "col",
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "electricityBill",
          label: "Electricity Bill",
          mandatory: true,
          boundaryClass: "col",
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "gasBill",
          label: "Gas Bill",
          mandatory: true,
          boundaryClass: "col",
        })
      ).addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "phoneBill",
          label: "Phone Bill",
          mandatory: true,
          boundaryClass: "col",
        })
      ).addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "otherUtilities",
          label: "Other Utilities",
          mandatory: true,
          boundaryClass: "col",
        })
      );
  }
}
