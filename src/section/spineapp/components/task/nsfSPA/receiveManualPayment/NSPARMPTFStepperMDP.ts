import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import FlowTaskIntf from "@/section/spineapp/util/task_intf/FlowTaskIntf";
import NSPARMPTStepFFormMDP from "./NSPARMPTStepFFormMDP";

export default class NSPARMPTFStepperMDP extends FTaskStepperMDP {
  taskRoot: FlowTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: FlowTaskIntf }) {
    super({ myRefName: "nSPARMPTFStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Receive Manual Payment",
      stepContent: new NSPARMPTStepFFormMDP({
        taskRoot: taskRoot,
        parent: this,
      }),
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
