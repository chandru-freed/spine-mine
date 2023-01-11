import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import NSPATFFormMDP from "./step1/NSPATFFormMDP";
import NSPAFTFinalFFormMDP from "./step2/NSPAFTFinalFFormMDP";

export default class NSPAFStepperMDP extends FTaskStepperMDP {
  taskRoot: ManualTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
    super({
      myRefName: "nsfSPAStepperRef",
      actionable: !taskRoot.taskDisabled,
    });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;

    const nspATFFormMDP = new NSPATFFormMDP({
      taskRoot: taskRoot,
      parent: this,
    });

    this.addStep({
      name: "Call",
      stepContent: nspATFFormMDP,
      submitFunc: nspATFFormMDP.validateAndSubmit(),
    }).addStep({
      name: "Mark Complete",
      stepContent: new NSPAFTFinalFFormMDP({
        taskRoot: taskRoot,
        parent: this,
      }),
    });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
