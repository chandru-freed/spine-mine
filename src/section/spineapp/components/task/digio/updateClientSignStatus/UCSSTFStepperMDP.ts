import FStepperMDP from "@/components/generic/FStepperMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";
import UCSSTDisplayStepFFormMDP from "./UCSSTDisplayStepFFormMDP";

export default class GSSADTFStepperMDP extends FStepperMDP {
  taskRoot: GenericTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: GenericTaskIntf }) {
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
