import FStepperMDP from "@/components/generic/FStepperMDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";
import GSSADTDisplayStepFFormMDP from "./GSSADTDisplayStepFFormMDP";

export default class GSSADTFStepperMDP extends FStepperMDP {
  taskRoot: GenericTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: GenericTaskIntf }) {
    super({ myRefName: " generateSSADocStepperRef" });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Document",
      stepContent: new GSSADTDisplayStepFFormMDP({
        taskRoot: taskRoot,
        parent: this,
      }),
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
