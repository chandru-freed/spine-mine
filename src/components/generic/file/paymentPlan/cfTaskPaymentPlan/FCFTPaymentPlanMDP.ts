import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";
import FCFTPaymentCalculatorFFormMDP from "./FCFTPaymentCalculatorFFormMDP";


export default class FCFTPaymentPlanMDP implements MDP {
  componentName = "FCFTPaymentPlan";
  taskRoot: any;
  parent: any;
  myRefName: string;
  dataSelectorKey: string | undefined;

  paymentCalculatorForm: FCFTPaymentCalculatorFFormMDP

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

    this.paymentCalculatorForm = new FCFTPaymentCalculatorFFormMDP({ taskRoot: this.taskRoot, parent: this, disabled: this.disabled,readonly: readonly })


  }


  ppCalculatorFormSubmit() {
    return (nextCallback?: () => void) => {
    this.paymentCalculatorForm.getMyRef().submitForm(() => {
      this.paymentCalculatorForm.schedulePaymentPlan(nextCallback);
    });
    }
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