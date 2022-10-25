import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import DeferredTaskIntf from "@/section/spineapp/util/task_intf/DeferredTaskIntf";
import NMSFSDTStepFFormMDP from "./NMSFSDTStepFFormMDP";

export default class NMSFSDTFStepperMDP extends FTaskStepperMDP {
  taskRoot: DeferredTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: DeferredTaskIntf }) {
    super({ myRefName: "nsfMSFSystemDeferredStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Nsf MSF System Deferred",
      stepContent: new NMSFSDTStepFFormMDP({
        taskRoot: taskRoot,
        parent: this,
      }),
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
