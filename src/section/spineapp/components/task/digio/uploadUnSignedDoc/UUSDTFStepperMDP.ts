import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";

import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import UUSDTFFormMDP from "./UUSDTUploadStepFFormMDP";

export default class UUSDTFStepperMDP extends FTaskStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({ myRefName: "uploadUnSignedDocStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;
    const uUSDTFFormMDP = new UUSDTFFormMDP({ taskRoot: taskRoot, parent: this })
    this.addStep({
      name: "Verify",
      stepContent: uUSDTFFormMDP,
      rescueFunc: uUSDTFFormMDP.validateAndSubmit()
    });
  }

  getMyRef() {
    console.log(this.parent.$refs);
    return this.taskRoot.$refs[this.myRefName];
  }
}
