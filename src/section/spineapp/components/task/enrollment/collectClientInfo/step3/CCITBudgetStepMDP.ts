import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";
import { CollectClientInfoTaskIntf } from "../CollectClientInfoTaskIntf";
import CCITBudgetFFormMDP from "./CCITBudgetFFormMDP";


export default class CCITBudgetStepMDP implements MDP {
  componentName = "CCITBudgetStep";
  taskRoot: CollectClientInfoTaskIntf;
  parent: any;
  myRefName: string;
  dataSelectorKey: string | undefined;

  budgetForm: FFormMDP

  actionList: FBtnMDP[] = [];

  disabled: boolean;

  constructor({
    taskRoot,
    parent,
  }: {
    taskRoot: CollectClientInfoTaskIntf;
    parent: any;
  }) {
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.myRefName = "budgetStepRef"
    this.dataSelectorKey = "taskOutput.budgetInfo"

    this.disabled = this.taskRoot.taskDisabled;

    this.budgetForm = new CCITBudgetFFormMDP({ taskRoot: this.taskRoot, parent: this })

    this.addAction(
      new FBtnMDP({
        label: "Save",
        onClick: this.saveTask(),
      })
    );
  }

  saveTask() {
    return () => {
      this.taskRoot.saveTask();
    };
  }

  addAction(newAction: FBtnMDP) {
    this.actionList.push(newAction);
    return this;
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