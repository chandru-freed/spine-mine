import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";

import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import UFSDTStepFFormMDP from "./UFSDTStepFFormMDP";

export default class UFSDTFStepperMDP extends FTaskStepperMDP {
  taskRoot: SelfTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: SelfTaskIntf }) {
    super({ myRefName: "uploadFreedSignedDocStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Upload Freed Signed Doc",
      stepContent: new UFSDTStepFFormMDP({ taskRoot: taskRoot, parent: this }),
    });
  }
  getMyRef() {
    console.log(this.parent.$refs);
    return this.taskRoot.$refs[this.myRefName];
  }
}
