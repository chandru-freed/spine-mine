import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import MDP from "@/components/generic/MDP";
import SelfTaskIntf from "@/section/spineapp/util/task_intf/SelfTaskIntf";
import GEMSTStepFFormMDP from "./GEMSTStepFFormMDP";

export default class GEMSTFStepperMDP extends FTaskStepperMDP {
  taskRoot: SelfTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: SelfTaskIntf }) {
    super({ myRefName: "getEMandateStatusStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = this;

    this.addStep({
      name: "Get Emandate Status",
      stepContent: new GEMSTStepFFormMDP({ taskRoot: taskRoot, parent: this }),
    });
  }

  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
