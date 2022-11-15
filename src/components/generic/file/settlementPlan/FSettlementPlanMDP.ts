import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";
export default class FSettlementPlanMDP implements MDP {
  componentName = "FSettlementPlan";
  taskRoot: any;
  parent: any;
  myRefName: string;
  dataSelectorKey: string | undefined;
  disabled: boolean;

  constructor({ taskRoot,disabled}: { taskRoot: any;disabled: boolean}) {
    this.taskRoot = taskRoot;
    this.disabled = disabled;
    
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      myRefName: this.myRefName,
      dataSelectorKey: this.dataSelectorKey,
      props: {
        taskRoot: this.taskRoot,
        disabled: this.disabled
      },
    };
  }

}
