import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";
import FPaymentCalculatorFFormMDP from "./FPaymentCalculatorFFormMDP";


export default class FPaymentPlanMDP implements MDP {
  componentName = "FPaymentPlan";
  taskRoot: any;
  parent: any;
  myRefName: string;
  dataSelectorKey: string | undefined;

  paymentCalculatorForm: FPaymentCalculatorFFormMDP

  actionList: FBtnMDP[] = [];

  disabled: boolean;
  hideMSFTab: boolean;
  disabledActionBtn: boolean;

  constructor({
    taskRoot,
    parent,
    myRefName,
    dataSelectorKey,
    disabled,
    readonly=false,
    hideMSFTab=false, 
    disabledActionBtn=false,
  }: {
    taskRoot: any;
    parent: any;
    myRefName: string;
    dataSelectorKey?: string;
    disabled: boolean;
    readonly?: boolean;
    hideMSFTab?: boolean;
    disabledActionBtn?: boolean;
  }) {
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.myRefName = myRefName
    this.dataSelectorKey = dataSelectorKey
    this.disabled = disabled
    this.hideMSFTab = hideMSFTab
    this.disabledActionBtn = disabledActionBtn

    this.paymentCalculatorForm = new FPaymentCalculatorFFormMDP({ taskRoot: this.taskRoot, parent: this, disabled: this.disabled,readonly: readonly })


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
        paymentCalculatorFormMetaData: this.paymentCalculatorForm.getMetaData(),
        actionMetaDataList: this.actionList.map(action => action.getMetaData()),
        hideMSFTab: this.hideMSFTab,
        disabledActionBtn: this.disabledActionBtn
      }
    }
  }
}