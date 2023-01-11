import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import DeferredTaskIntf from "@/section/spineapp/util/task_intf/DeferredTaskIntf";
import CMPRTStepFFormMDP from "./CMPRTStepFFormMDP";

export default class CMPRTFStepperMDP extends FTaskStepperMDP {
  taskRoot: DeferredTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: DeferredTaskIntf }) {
    super({
      myRefName: "checkManualPaymentReceivedStepperRef",
      actionable: false,
    });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;
    this.addStep({
      name: "Check Manual Payment Received",
      stepContent: new CMPRTStepFFormMDP({ taskRoot: taskRoot, parent: this }),
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
