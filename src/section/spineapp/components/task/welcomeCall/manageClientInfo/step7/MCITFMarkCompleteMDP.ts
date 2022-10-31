import FBtnMDP, { BtnType } from "@/components/generic/FBtnMDP";
import FMarkCompleteMDP from "@/components/generic/file/markcomplete/FMarkCompleteMDP";
import MCITMarkCompleteStepFFormMDP from "./MCITMarkCompleteStepFFormMDP";

export default class MCITFMarkCompleteMDP extends FMarkCompleteMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: any; parent: any }) {
    super();
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addForm(new MCITMarkCompleteStepFFormMDP({ taskRoot, parent }));
  }
  isStarted() {
    return (
      this.taskRoot.taskDetails.taskState === "STARTED" ||
      this.taskRoot.taskDetails.taskState === "PARTIALLY_COMPLETED"
    );
  }
}
