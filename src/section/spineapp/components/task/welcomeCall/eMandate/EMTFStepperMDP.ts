import FStepperMDP from "@/components/generic/FStepperMDP";
import FTaskStepperMDP from "@/components/generic/FTaskStepperMDP";
import FlowTaskIntf from "@/section/spineapp/util/task_intf/FlowTaskIntf";
import EMTStepFFormMDP from "./EMTStepFFormMDP";

export default class EMTFStepperMDP extends FTaskStepperMDP {
  taskRoot: FlowTaskIntf;
  parent: any;
  constructor({ taskRoot }: { taskRoot: FlowTaskIntf }) {
    super({ myRefName: "eMandateStepperRef", actionable: false });
    this.taskRoot = taskRoot;
    this.parent = taskRoot;
    this.addStep({
      name: "Emandate",
      stepContent: new EMTStepFFormMDP({ taskRoot: taskRoot, parent: this }),
    });
  }
  getMyRef() {
    return this.taskRoot.$refs[this.myRefName];
  }
}
