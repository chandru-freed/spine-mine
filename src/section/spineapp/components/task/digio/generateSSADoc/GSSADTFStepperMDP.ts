import FStepperMDP from "@/components/generic/FStepperMDP";
import GenerateSSADocTaskIntf from "./GenerateSSADocTaskIntf";
import GSSADTDisplayStepFFormMDP from "./GSSADTDisplayStepFFormMDP";

export default class GSSADTFStepperMDP extends FStepperMDP {
  taskRoot: GenerateSSADocTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: GenerateSSADocTaskIntf }) {
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
