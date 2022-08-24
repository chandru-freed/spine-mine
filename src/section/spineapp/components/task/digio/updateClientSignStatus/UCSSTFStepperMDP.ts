import FStepperMDP from "@/components/generic/FStepperMDP";
import UpdateClientSignStatusTaskIntf from "./UpdateClientSignStatusTaskIntf";
import UCSSTDisplayStepFFormMDP from "./UCSSTDisplayStepFFormMDP";

export default class GSSADTFStepperMDP extends FStepperMDP {
  taskRoot: UpdateClientSignStatusTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: UpdateClientSignStatusTaskIntf }) {
    super({ myRefName: "updateClientSignStatusStepperRef" });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Document",
      stepContent: new UCSSTDisplayStepFFormMDP({
        taskRoot: taskRoot,
        parent: this,
      }),
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
