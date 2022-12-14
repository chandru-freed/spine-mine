import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FBudgetMiniFormMDP from "@/components/generic/form/field/FBudgetMiniFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";

export default class FIncomeSourcesFBudgetMiniFormMDP extends FBudgetMiniFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      parentMDP: new FFormChildMDP(),
      dataSelectorKey: "incomeSources",
      disabled: taskRoot.taskDisabled,
      label: "Income Sources",
      mandatory: true,
      boundaryClass: "col-12",
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "salary",
        label: "Salary",
        mandatory: true,
        boundaryClass: "col",
        hideDetails: true
      })
    )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "businessIncome",
          label: "Business Income",
          mandatory: true,
          boundaryClass: "col",
          hideDetails: true
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "otherIncome",
          label: "Other Income",
          mandatory: true,
          boundaryClass: "col",
          hideDetails: true
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "familySupport",
          label: "Family Support",
          mandatory: true,
          boundaryClass: "col",
          hideDetails: true
        })
      );
  }
}
