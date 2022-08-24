import FStepperMDP from "@/components/generic/FStepperMDP";
import MDP from "@/components/generic/MDP";
import { GenericTaskIntf } from "@/section/spineapp/util/GenericTaskIntf";
import CIVTFFormMDP from "./CIVTFFormMDP";


export default class CIVTFStepperMDP extends FStepperMDP {
    taskRoot: GenericTaskIntf;
    parent: any;
    constructor({ taskRoot }: { taskRoot: GenericTaskIntf }) {
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
