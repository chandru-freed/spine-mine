import FStepperMDP from "@/components/generic/FStepperMDP";
import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import NSPADRTRescheduleStepFFormMDP from "./NSPADRTRescheduleStepFFormMDP";

export default class NSPADRTFStepperMDP extends FTaskStepperMDP {
  taskRoot: SelfTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: SelfTaskIntf }) {
    super({ myRefName: "nsfSPADraftRescheduledStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    this.addStep({
      name: "Draft Reschedule",
      stepContent: new NSPADRTRescheduleStepFFormMDP({
        taskRoot: taskRoot,
        parent: this,
      }),
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
