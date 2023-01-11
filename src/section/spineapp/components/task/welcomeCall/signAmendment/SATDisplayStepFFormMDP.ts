import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FSelectFieldMDP from "@/components/generic/form/field/FSelectFieldMDP";
import FSwitchMDP from "@/components/generic/form/field/FSwitchMDP";
import FlowTaskIntf from "@/section/spineapp/util/task_intf/FlowTaskIntf";

export default class SATDisplayStepFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: FlowTaskIntf;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: FlowTaskIntf; parent: any }) {
    super({
      myRefName: "signAmendmentDisplayFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FSelectFieldMDP({
        label: "Amendment Type",
        dataSelectorKey: "taskInput.amendmentType",
        parentMDP: this.childMDP,
        options: ["Amendment1", "Amendment2"],
        disabled: true,
      })
    )
      .addField(
        new FSwitchMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.eMandateNeeded",
          label: "Emandate Needed",
          disabled: true,
        })
      )
      .addField(
        new FSwitchMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "taskOutput.signAmendmentFailed",
          label: "Sign Amendment Failed",
          disabled: true,
        })
      )
      .addAction(
        new FBtnMDP({
          label: "Rescue Task",
          onClick: this.rescueTask(),
          btnType: BtnType.FILLED,
        })
      );
  }

  rescueTask() {
    return () => {
      this.taskRoot.rescueTask();
    };
  }
}
