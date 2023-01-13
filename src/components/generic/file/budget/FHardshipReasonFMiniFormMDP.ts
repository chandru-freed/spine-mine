import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FBudgetMiniFormMDP from "@/components/generic/form/field/FBudgetMiniFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import FMiniFormMDP from "../../form/field/FMiniFormMDP";
import FTextareaMDP from "../../form/field/FTextareaMDP";

export default class FHardshipReasonFMiniFormMDP extends FMiniFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super({
      parentMDP: new FFormChildMDP(),
      disabled: taskRoot.taskDisabled,
      label: "Reason For Hardship",
      dataSelectorKey: "taskOutput.budgetInfo",
      mandatory: true,
      boundaryClass: "col-5",
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FTextareaMDP({
        parentMDP: this.childMDP,
        label: "Reason For Hardship",
        dataSelectorKey: "hardshipReason",
        mandatory: true,
        rows: '7',
        autoGrow: false
      })
    );
  }
}
