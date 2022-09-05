import FStepperMDP from "@/components/generic/FStepperMDP";
import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import CHPPTCollectInfoStepFFormMDP from "./step1/CHPPTCollectInfoStepFFormMDP";
import CHPPTProofStepFDocumentMDP from "./step2/CHPPTProofStepFDocumentMDP";
import CHPPTFinalStepFFormMDP from "./step3/CHPPFinalStepFFormMDP";

export default class CHPPFStepperMDP extends FStepperMDP {
  taskRoot: ManualTaskIntf;
  parent: any;

  constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
    super({ myRefName: "chppStepperRef" });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;
    this.addStep({
      name: "Collect Info",
      stepContent: new CHPPTCollectInfoStepFFormMDP({
        taskRoot: taskRoot,
        parent: this,
      }),
    }).addStep({
      name: "Collect Proof Documents",
      stepContent: new CHPPTProofStepFDocumentMDP({
        taskRoot: taskRoot,
        parent: this
      }),
    }).addStep({
        name: "Mark Complete",
        stepContent: new CHPPTFinalStepFFormMDP({
            taskRoot: taskRoot,
            parent: this 
        })
    });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
