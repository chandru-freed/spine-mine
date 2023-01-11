import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import DCSDTStepFFormMDP from "./DCSDTStepFFormMDP";

export default class DCSDTFStepperMDP extends FTaskStepperMDP {
  taskRoot: any;
  parent: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({ myRefName: "downloadClientSignDocStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    const dCSDTStepFFormMDP =  new DCSDTStepFFormMDP({ taskRoot: taskRoot, parent: this })

    this.addStep({
      name: "Download Client Sign Doc",
      stepContent: dCSDTStepFFormMDP,
      rescueFunc: dCSDTStepFFormMDP.validateAndSubmit()
    });
  }
  getMyRef() {
    console.log(this.parent.$refs);
    return this.taskRoot.$refs[this.myRefName];
  }
}
