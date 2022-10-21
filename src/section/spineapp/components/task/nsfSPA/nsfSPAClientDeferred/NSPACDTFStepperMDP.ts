import FStepperMDP from "@/components/generic/FStepperMDP";
import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import DeferredTaskIntf from "@/section/spineapp/util/task_intf/DeferredTaskIntf";
import NSPACDTStepFFormMDP from "./NSPACDTStepFFormMDP";

export default class NSPACDTFStepperMDP extends FTaskStepperMDP {
  taskRoot: DeferredTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: DeferredTaskIntf }) {
    super({ myRefName: "nsfSPAClientDeferredStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Nsf SPA Client Deferred",
      stepContent: new NSPACDTStepFFormMDP({
        taskRoot: taskRoot,
        parent: this,
      }),
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
