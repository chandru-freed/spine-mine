import FBtnMDP from "@/components/generic/FBtnMDP";
import FFormMDP, { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import MDP from "@/components/generic/MDP";
import CCITAddCreditorFFormMDP from "./FUploadDocumentFFormMDP";

export default class FDocumentMDP implements MDP {
  componentName = "FDocument";
  taskRoot: any;
  parent: any;
  myRefName: string;
  dataSelectorKey: string | undefined;

  uploadDocumentForm: FFormMDP;
  actionList: FBtnMDP[] = [];
  disabled: boolean;

  constructor({ taskRoot, parent, myRefName, dataSelectorKey, disabled }: { taskRoot: any; parent: any; myRefName: string; dataSelectorKey: string; disabled: boolean }) {
    this.taskRoot = taskRoot;
    this.parent = parent;
    this.myRefName = myRefName;
    this.dataSelectorKey = dataSelectorKey;
    this.disabled = disabled;

    this.uploadDocumentForm = new CCITAddCreditorFFormMDP({
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
        uploadDocumentFormMetaData: this.uploadDocumentForm.getMetaData(),
        actionMetaDataList: this.actionList.map((action) =>
          action.getMetaData()
        ),
        disabled: this.disabled,
      },
    };
  }
}