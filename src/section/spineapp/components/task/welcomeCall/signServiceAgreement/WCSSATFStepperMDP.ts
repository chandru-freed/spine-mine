import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import FlowTaskIntf from "@/section/spineapp/util/task_intf/FlowTaskIntf";
import WCSSATStepFFormMDP from "./WCSSATStepFFormMDP";

export default class WCSSATFStepperMDP extends FTaskStepperMDP {
  taskRoot: FlowTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: FlowTaskIntf }) {
    super({ myRefName: "wCSSATFStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Sign Service Agreement",
      stepContent: new WCSSATStepFFormMDP({ taskRoot: taskRoot, parent: this }),
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
