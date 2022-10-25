import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";
import FAddEMandateFFormMDP from "./FAddEMandateFFormMDP";

export default class FEMandateMDP implements MDP {
  componentName = "FEMandate";
  taskRoot: any;
  parent: any;
  myRefName: string;
  dataSelectorKey: string | undefined;

  addEMandateForm: FFormMDP;
  //   editCreditorForm: FFormMDP;
  actionList: FBtnMDP[] = [];
  disabled: boolean;
  readonly: boolean | undefined;

  constructor({ taskRoot, parent, myRefName, dataSelectorKey, disabled, readonly }: { taskRoot: any; parent: any; myRefName: string; dataSelectorKey?: string | undefined; disabled: boolean; readonly?: boolean }) {
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.myRefName = myRefName;
    this.dataSelectorKey = dataSelectorKey;
    this.disabled = disabled;
    this.readonly = readonly;

    this.addEMandateForm = new FAddEMandateFFormMDP({
      taskRoot: this.taskRoot,
      parent: this,
    });
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
        addEMandateFormMetaData: this.addEMandateForm.getMetaData(),
        actionMetaDataList: this.actionList.map((action) =>
          action.getMetaData()
        ),
        disabled: this.disabled,
        readonly: this.readonly,
        taskRoot: this.taskRoot
      },
    };
  }

}
