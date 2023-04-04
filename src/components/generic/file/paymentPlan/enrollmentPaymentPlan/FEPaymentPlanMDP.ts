import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";
import FSnackbar from "@/fsnackbar";
import FPaymentCalculatorFFormMDP from "./FEPaymentCalculatorFFormMDP";


export default class FEPaymentPlanMDP implements MDP {
  componentName = "FEPaymentPlan";
  taskRoot: any;
  parent: any;
  myRefName: string;
  dataSelectorKey: string | undefined;

  paymentCalculatorForm: FPaymentCalculatorFFormMDP

  actionList: FBtnMDP[] = [];

  disabled: boolean;

  constructor({
    taskRoot,
    parent,
    myRefName,
    dataSelectorKey,
    disabled,
    readonly = false,
  }: {
    taskRoot: any;
    parent: any;
    myRefName: string;
    dataSelectorKey?: string;
    disabled: boolean;
    readonly?: boolean;
  }) {
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.myRefName = myRefName
    this.dataSelectorKey = dataSelectorKey
    this.disabled = disabled

    this.paymentCalculatorForm = new FPaymentCalculatorFFormMDP({ taskRoot: this.taskRoot, parent: this, disabled: this.disabled, readonly: readonly })


  }


  addAction(newAction: FBtnMDP) {
    this.actionList.push(newAction);
    return this;
  }

  validateEntries() {
    return (nextCallback: () => void) => {
      const editMode = this.getMyRef().$refs['tmosSimulator'].editMode;
      const paymentScheduleList = this.taskRoot.taskFormOutput?.paymentPlan?.paymentScheduleList || [];
      const isOutstandingChanged = this.taskRoot.isOutstandingChanged();
      if (editMode) {
        FSnackbar.error("Please click recalculate or cancel to proceed")
      } else if (paymentScheduleList.length === 0) {
        FSnackbar.error("There should be atleast one entry")
      } else if(isOutstandingChanged) {
        FSnackbar.error("Total outstanding changed.Please recalculate to proceed")
      } else {
        nextCallback()
      }
    };
  }




  getMyRef(): any {
    return this.parent.getMyRef()[0].$refs[this.myRefName];
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
      }
    }
  }
}