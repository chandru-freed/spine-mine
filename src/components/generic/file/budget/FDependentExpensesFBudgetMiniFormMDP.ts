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
      mandatory: true,
      boundaryClass: "col-12",
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "medicalExpense",
        label: "Medical",
        mandatory: true,
        boundaryClass: "col",
        hideDetails: true
      })
    )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "essentialCareExpense",
          label: "Essential Care",
          mandatory: true,
          boundaryClass: "col",
          hideDetails: true
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "schoolFeeExpense",
          label: "School Fee",
          mandatory: true,
          boundaryClass: "col",
          hideDetails: true
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "schoolBusExpense",
          label: "School Bus",
          mandatory: true,
          boundaryClass: "col",
          hideDetails: true
        })
      ).addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "booksAndProjectsExpense",
          label: "Books And Projects",
          mandatory: true,
          boundaryClass: "col",
          hideDetails: true
        })
      ).addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "nursingAttendExpense",
          label: "Nursing Attend",
          mandatory: true,
          boundaryClass: "col",
          hideDetails: true
        })
      ).addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "petCareExpense",
          label: "Pet Care",
          mandatory: true,
          boundaryClass: "col",
          hideDetails: true
        })
      )
  }
}
