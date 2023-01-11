import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import Task from "@/section/spineapp/util/Task";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";

export default class FUCTFinalFFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: ManualTaskIntf; parent: any }) {
    super({
      myRefName: "fUCTFinalFFormRef",
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
