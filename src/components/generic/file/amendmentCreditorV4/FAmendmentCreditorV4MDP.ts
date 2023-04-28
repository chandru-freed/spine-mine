import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";
export default class FAmendmentCreditorV4MDP implements MDP {
  componentName = "FAmendmentCreditorV4";
  taskRoot: any;
  parent: any;
  myRefName: string;
  dataSelectorKey: string | undefined;

  addCreditorForm: FFormMDP;
  editCreditorForm: FFormMDP;
  actionList: FBtnMDP[] = [];
  disabled: boolean;
  readonly: boolean | undefined;

  constructor({ taskRoot, parent, myRefName, dataSelectorKey, disabled,readonly }: { taskRoot: any; parent: any; myRefName: string; dataSelectorKey?: string | undefined; disabled: boolean;readonly?: boolean }) {
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.myRefName = myRefName;
    this.dataSelectorKey = dataSelectorKey;
    this.disabled = disabled;
    this.readonly = readonly;

    // this.addCreditorForm = new FAddCreditorFFormMDP({
    //   taskRoot: this.taskRoot,
    //   parent: this,
    // });

    // this.editCreditorForm = new FEditCreditorFFormMDP({
    //   taskRoot: this.taskRoot,
    //   parent: this,
    // });
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
        // addCreditorFormMetaData: this.addCreditorForm.getMetaData(),
        // editCreditorFormMetaData: this.editCreditorForm.getMetaData(),
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
