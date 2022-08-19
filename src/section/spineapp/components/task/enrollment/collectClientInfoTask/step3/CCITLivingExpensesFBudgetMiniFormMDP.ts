import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FBudgetMiniFormMDP from "@/components/generic/form/field/FBudgetMiniFormMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";

export default class CCITLivingExpensesFBudgetMiniFormMDP extends FBudgetMiniFormMDP {
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
      boundaryClass: "col-4",
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FNumberFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "rentMaintenance",
        label: "Rent / Maintenance",
        mandatory: true,
      })
    )
      .addField(
        new FNumberFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "grocerryExpense",
          label: "Grocerry Expense",
          mandatory: true,
        })
      )
      .addField(
        new FNumberFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "electricBill",
          label: "Elctric Bill",
          mandatory: true,
        })
      )
      .addField(
        new FNumberFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "gasBill",
          label: "Gas Bill",
          mandatory: true,
        })
      ).addField(
        new FNumberFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "phoneBill",
          label: "Phone Bill",
          mandatory: true,
        })
      ).addField(
        new FNumberFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "otherUtilities",
          label: "Other Utilities",
          mandatory: true,
        })
      );
  }
}
