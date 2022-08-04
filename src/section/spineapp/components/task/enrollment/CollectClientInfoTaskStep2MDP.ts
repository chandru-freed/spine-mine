import { MDP } from "@/components/MDP";
import FFormMDP from "@/components/form/FFormMDP";
import { FFormChildMDP } from "@/components/form/FFormMDP";
import FTextFieldMDP from "@/components/form/field/FTextFieldMDP";
import {
  CollectClientInfoTaskFStepperMDP,
  CollectClientInfoTaskInf,
} from "./CollectClientInfoTaskInf";
import FBtnMDP from "@/components/FBtnMDP";
import { CollectClientInfoTaskStep2AddFormMDP } from "./CollectClientInfoTaskStep2AddFormMDP";
import { CollectClientInfoTaskStep2EditFormMDP } from "./CollectClientInfoTaskStep2EditFormMDP";

export default class CollectClientInfoTaskStep2MDP implements MDP {
  root: CollectClientInfoTaskInf;
  parent: CollectClientInfoTaskFStepperMDP;

  componentName = "CollectClientInfoTaskStep2";

  id: string;
  myRef: string;
  dataSelectorKey?: string;
  disabled: boolean;

  addFormMDP: FFormMDP;
  editFormMDP: FFormMDP;
  actionListMDP: FBtnMDP[] = [];

  constructor(
    root: CollectClientInfoTaskInf,
    parent: CollectClientInfoTaskFStepperMDP
  ) {
    this.root = root;
    this.parent = parent;
    this.id = "creditorListInfo";
    this.myRef = "creditorListInfoRef";
    this.dataSelectorKey = "creditorList";
    this.disabled = root.formDisabled;

    this.addFormMDP = new CollectClientInfoTaskStep2AddFormMDP(root, this);
    this.editFormMDP = new CollectClientInfoTaskStep2EditFormMDP(root, this);
    this.actionListMDP.push(
      new FBtnMDP({
        id: "saveBtn",
        label: "Save",
        outlined: true,
        onClick: this.root.saveTask,
      })
    );
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRef][0];
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      id: this.id,
      myRef: this.myRef,
      dataSelectorKey: this.dataSelectorKey,
      props: {
        id: this.id,
        myRef: this.myRef,
        name: this.myRef,
        addFormMetaData: this.addFormMDP.getMetaData(),
        editFormMetaData: this.editFormMDP.getMetaData(),
        actionListMetaData: this.actionListMDP.map((mdp) => mdp.getMetaData()),
        disabled: this.disabled,
      },
    };
  }
}
