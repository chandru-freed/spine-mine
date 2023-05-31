import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";
import FSnackbar from "@/fsnackbar";
import FPaymentCalculatorFFormMDP from "./FBPaymentCalculatorFFormMDP";


export default class FBPaymentPlanMDP implements MDP {
  componentName = "FBPaymentPlan";
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


  ppCalculatorFormSubmit() {
    return (nextCallback?: () => void) => {
    this.paymentCalculatorForm.getMyRef().submitForm(() => {
      this.paymentCalculatorForm.schedulePaymentPlan(nextCallback);
    });
    }
  }

  validateEntries() {
    return (nextCallback: () => void) => {
      const editMode = this.getMyRef().$refs['tmosSimulator'].editMode;
      const isOutstandingChanged = this.getMyRef().$refs['tmosSimulator'].isOutstandingChanged()
      if (editMode) {
        FSnackbar.error("Please click recalculate or cancel to proceed")
      } else if (isOutstandingChanged) {
        FSnackbar.error("Outstanding has changed.Please recalculate to proceed")
      } else {
        nextCallback()
      }
    };
  }

  getMyRef(): any {
    return this.parent.getMyRef()[0].$refs[this.myRefName];
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
        disabledActionBtn: this.disabledActionBtn,
        taskRoot: this.taskRoot
      }
    }
  }
}