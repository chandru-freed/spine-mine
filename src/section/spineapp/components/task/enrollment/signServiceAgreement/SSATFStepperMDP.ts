import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import FlowTaskIntf from "@/section/spineapp/util/task_intf/FlowTaskIntf";
import SSATStepFFormMDP from "./SSATStepFFormMDP";

export default class SSATFStepperMDP extends FTaskStepperMDP {
  taskRoot: FlowTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: FlowTaskIntf }) {
    super({ myRefName: "sSATFStepperRef", actionable: !taskRoot.taskDisabled });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;
    this.addStep({
      name: "Sign Service Agreement",
      stepContent: new SSATStepFFormMDP({ taskRoot: taskRoot, parent: this }),
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
