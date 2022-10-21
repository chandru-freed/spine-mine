import FStepperMDP from "@/components/generic/FStepperMDP";
import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import DeferredTaskIntf from "@/section/spineapp/util/task_intf/DeferredTaskIntf";
import NMSFCDTStepFFormMDP from "./NMSFCDTStepFFormMDP";

export default class NMSFCDTFStepperMDP extends FTaskStepperMDP {
  taskRoot: DeferredTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: DeferredTaskIntf }) {
    super({ myRefName: "nsfMSFClientDeferredStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Nsf MSF Client Deferred",
      stepContent: new NMSFCDTStepFFormMDP({
        taskRoot: taskRoot,
        parent: this,
      }),
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
