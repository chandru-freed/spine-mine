import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";
import { CollectClientInfoTaskIntf } from "../CollectClientInfoTaskIntf";
import CCITPaymentCalculatorFFormMDP from "./CCITPaymentCalculatorFFormMDP";


export default class CCITPaymentPlanStepMDP implements MDP {
  componentName = "CCITPaymentPlanStep";
  taskRoot: CollectClientInfoTaskIntf;
  parent: any;
  myRefName: string;
  dataSelectorKey: string | undefined;

  paymentCalculatorForm: FFormMDP

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
    this.myRefName = "paymentPlanStepRef"
    // this.dataSelectorKey = "paymentPlan"

    this.disabled = this.taskRoot.taskDisabled;

    this.paymentCalculatorForm = new CCITPaymentCalculatorFFormMDP({ taskRoot: this.taskRoot, parent: this })

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

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName][0]
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      myRefName: this.myRefName,
      dataSelectorKey: this.dataSelectorKey,
      props: {
        disabled: this.disabled,
        paymentCalculatorFormMetaData: this.paymentCalculatorForm.getMetaData(),
        actionMetaDataList: this.actionList.map(action => action.getMetaData())
      }
    }
  }
}