import FStepperMDP from "@/components/generic/FStepperMDP";
import MDP from "@/components/generic/MDP";
import CIVTFFormMDP from "./CIVTFFormMDP";
import ClientInfoVerificationTaskIntf from "./ClientInfoVerificationTaskIntf";

export default class CIVTFStepperMDP extends FStepperMDP {
    taskRoot: ClientInfoVerificationTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: ClientInfoVerificationTaskIntf }) {
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
