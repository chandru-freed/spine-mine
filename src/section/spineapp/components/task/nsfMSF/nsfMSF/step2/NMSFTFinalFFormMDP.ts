import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FNumberFieldMDP from "@/components/generic/form/field/FNumberFieldMDP";
import FTextFieldMDP from "@/components/generic/form/field/FTextFieldMDP";
import Task from "@/section/spineapp/util/Task";
import DeferredTaskIntf from "@/section/spineapp/util/task_intf/DeferredTaskIntf";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";

export default class NMSFTFinalFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: ManualTaskIntf; parent: any }) {
    super({
      myRefName: "nsfMSFClientDeferredFormRef",
      disabled: taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addAction(
      new FBtnMDP({
        label: "Mark Complete",
        onClick: this.saveAndMarkCompleteTask(),
        btnType: BtnType.FILLED,
        condition: Task.isMarkCompleteEnabled(this.taskRoot.taskDetails)
      })
    );
  }

  saveAndMarkCompleteTask() {
    return () => {
      this.taskRoot.saveAndMarkCompleteTask();
    };
  }
}
