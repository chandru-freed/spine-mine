import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";
import CCITAddCreditorFFormMDP from "./CCITAddCreditorFFormMDP";
import CCITEditCreditorFFormMDP from "./CCITEditCreditorFFormMDP";
export default class CCITCreditorStepMDP implements MDP {
  componentName = "CCITCreditorStep";
  taskRoot: any;
  parent: any;
  myRefName: string;
  dataSelectorKey: string | undefined;

  addCreditorForm: FFormMDP;
  editCreditorForm: FFormMDP;
  actionList: FBtnMDP[] = [];
  disabled: boolean;

  constructor({
    taskRoot,
    parent,
  }: {
    taskRoot: any;
    parent: any;
  }) {
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.myRefName = "creditorListRef";
    this.dataSelectorKey = "creditorInfo";
    this.disabled = this.taskRoot.taskDisabled;

    this.addCreditorForm = new CCITAddCreditorFFormMDP({
      taskRoot: this.taskRoot,
      parent: this,
    });

    this.editCreditorForm = new CCITEditCreditorFFormMDP({
      taskRoot: this.taskRoot,
      parent: this,
    });

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
        addCreditorFormMetaData: this.addCreditorForm.getMetaData(),
        editCreditorFormMetaData: this.editCreditorForm.getMetaData(),
        actionMetaDataList: this.actionList.map((action) =>
          action.getMetaData()
        ),
        disabled: this.disabled,
      },
    };
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRefName];
  }
}
