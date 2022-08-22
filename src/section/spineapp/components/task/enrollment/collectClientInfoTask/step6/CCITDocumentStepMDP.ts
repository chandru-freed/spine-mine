import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";
import { CollectClientInfoTaskIntf } from "../CollectClientInfoTaskIntf";
import CCITAddCreditorFFormMDP from "./CCITUploadDocumentFFormMDP";

export default class CCITDocumentStepMDP implements MDP {
  componentName = "CCITDocumentStep";
  taskRoot: CollectClientInfoTaskIntf;
  parent: any;
  myRefName: string;
  dataSelectorKey: string | undefined;

  uploadDocumentForm: FFormMDP;
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
    this.myRefName = "documentListRef";
    this.dataSelectorKey = "documentList";
    this.disabled = this.taskRoot.taskDisabled;

    this.uploadDocumentForm = new CCITAddCreditorFFormMDP({
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
        uploadDocumentFormMetaData: this.uploadDocumentForm.getMetaData(),
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
