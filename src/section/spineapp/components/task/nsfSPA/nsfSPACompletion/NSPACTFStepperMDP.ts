import FStepperMDP from "@/components/generic/FStepperMDP";
import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import NSPACTStepFFormMDP from "./NSPACTStepFFormMDP";

export default class NSPACTFStepperMDP extends FTaskStepperMDP {
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
    super({ myRefName: "nsfSPACompletionStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;
    this.addStep({
      name: "Nsf SPA Completion",
      stepContent: new NSPACTStepFFormMDP({
        taskRoot: this.taskRoot,
        parent: this,
      }),
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
