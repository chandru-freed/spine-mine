import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";
import FBudgetFFormMDP from "./FBudgetFFormMDP";


export default class FBudgetMDP implements MDP {
  componentName = "FBudget";
  taskRoot: any;
  parent: any;
  myRefName: string;
  dataSelectorKey: string | undefined;

  budgetForm: FFormMDP

  actionList: FBtnMDP[] = [];

  disabled: boolean;

  constructor({ taskRoot, parent, myRefName, dataSelectorKey, disabled }: { taskRoot: any; parent: any; myRefName: string; dataSelectorKey?: string; disabled: boolean }) {
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.myRefName = myRefName
    this.dataSelectorKey = dataSelectorKey

    this.disabled = disabled

    this.budgetForm = new FBudgetFFormMDP({ taskRoot: this.taskRoot, parent: this, disabled: disabled })

  }


  addAction(newAction: FBtnMDP) {
    this.actionList.push(newAction);
    return this;
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      myRefName: this.myRefName,
      dataSelectorKey: this.dataSelectorKey,
      props: {
        disabled: this.disabled,
        budgetFormMetaData: this.budgetForm.getMetaData(),
        actionMetaDataList: this.actionList.map(action => action.getMetaData())
      }
    }
  }
}