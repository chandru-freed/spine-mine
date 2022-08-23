import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FBudgetMiniFormMDP from "@/components/generic/form/field/FBudgetMiniFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import { CollectClientInfoTaskIntf } from "../CollectClientInfoTaskIntf";

export default class CCITIncomeSourcesFBudgetMiniFormMDP extends FBudgetMiniFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: CollectClientInfoTaskIntf;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: CollectClientInfoTaskIntf; parent: any }) {
    super({
      parentMDP: new FFormChildMDP(),
      dataSelectorKey: "incomeSources",
      disabled: taskRoot.taskDisabled,
      label: "Income Sources",
      mandatory: true,
      boundaryClass: "col-4",
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "salary",
        label: "Salary",
        mandatory: true,
      })
    )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "businessIncome",
          label: "Business Income",
          mandatory: true,
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "otherIncome",
          label: "Other Income",
          mandatory: true,
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "familySupport",
          label: "Family Support",
          mandatory: true,
        })
      );
  }
}
