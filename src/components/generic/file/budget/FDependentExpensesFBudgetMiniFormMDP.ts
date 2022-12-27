import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FBudgetMiniFormMDP from "@/components/generic/form/field/FBudgetMiniFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";

export default class FDependentExpensesFBudgetMiniFormMDP extends FBudgetMiniFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      parentMDP: new FFormChildMDP(),
      dataSelectorKey: "taskOutput.budgetInfo.dependentExpenses",
      disabled: taskRoot.taskDisabled,
      label: "Dependent Expenses",
      boundaryClass: "col-12",
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "medicalExpense",
        label: "Medical",
        boundaryClass: "col",
        hideDetails: true
      })
    )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "essentialCareExpense",
          label: "Essential Care",
          boundaryClass: "col",
          hideDetails: true
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "schoolFeeExpense",
          label: "School Fee",
          boundaryClass: "col",
          hideDetails: true
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "schoolBusExpense",
          label: "School Bus",
          boundaryClass: "col",
          hideDetails: true
        })
      ).addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "booksAndProjectsExpense",
          label: "Books And Projects",
          boundaryClass: "col",
          hideDetails: true
        })
      ).addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "nursingAttendExpense",
          label: "Nursing Attend",
          boundaryClass: "col",
          hideDetails: true
        })
      ).addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "petCareExpense",
          label: "Pet Care",
          boundaryClass: "col",
          hideDetails: true
        })
      )
  }
}
