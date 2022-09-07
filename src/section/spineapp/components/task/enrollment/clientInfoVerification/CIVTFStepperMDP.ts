import FStepperMDP from "@/components/generic/FStepperMDP";
import MDP from "@/components/generic/MDP";

import ManualTaskIntf from "@/section/spineapp/util/task_intf/ManualTaskIntf";
import CIVTFFormMDP from "./CIVTFFormMDP";


export default class CIVTFStepperMDP extends FStepperMDP {
    taskRoot: ManualTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: ManualTaskIntf }) {
      super({ myRefName: " clientInfoVerificationStepperRef" });
      this.taskRoot = taskRoot;
      this.parent = taskRoot;

      this.addStep({name: "Verify",stepContent: new CIVTFFormMDP({taskRoot: taskRoot, parent: this})})
    }

    getMyRef() {
        console.log(this.parent.$refs);
        return this.taskRoot.$refs[this.myRefName];
      }
    
}
