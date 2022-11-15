import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";
export default class FSettlementPlanMDP implements MDP {
  componentName = "FSettlementPlan";
  taskRoot: any;
  parent: any;
  myRefName: string;
  dataSelectorKey: string | undefined;

  constructor({ taskRoot,}: { taskRoot: any;}) {
    this.taskRoot = taskRoot;
   
    
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      myRefName: this.myRefName,
      dataSelectorKey: this.dataSelectorKey,
      props: {
        taskRoot: this.taskRoot
      },
    };
  }

}
