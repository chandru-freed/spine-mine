import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FMarkCompleteMDP from "@/components/generic/file/markcomplete/FMarkCompleteMDP";
import CCITMarkCompleteStepFFormMDP from "./CCITMarkCompleteStepFFormMDP";

export default class CCITFMarkCompleteMDP extends FMarkCompleteMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super();
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addAction(
      new FBtnMDP({
        label: "Mark Complete",
        onClick: this.saveAndMarkCompleteTask(),
        btnType: BtnType.FILLED,
        condition: this.isStarted(),
      })
    ).addForm(new CCITMarkCompleteStepFFormMDP({ taskRoot, parent }));
  }
  isStarted() {
    return (
      this.taskRoot.taskDetails.taskState === "STARTED" ||
      this.taskRoot.taskDetails.taskState === "PARTIALLY_COMPLETED"
    );
  }

  saveAndMarkCompleteTask() {
    return () => {
      this.taskRoot.saveAndMarkCompleteTask();
    };
  }
}
