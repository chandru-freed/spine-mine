import { MDP } from "@/components/MDP";
import FFormMDP from "@/components/form/FFormMDP";
import { FFormChildMDP } from "@/components/form/FFormMDP";
import FTextFieldMDP from "@/components/form/field/FTextFieldMDP";
import {
  CollectClientInfoTaskFStepperMDP,
  CollectClientInfoTaskInf,
} from "./CollectClientInfoTaskInf";
import FBtnMDP from "@/components/FBtnMDP";

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

    this.addFormMDP = new CollectClientInfoTaskStep1AddFormMDP(root, this);
    this.editFormMDP = new CollectClientInfoTaskStep1EditFormMDP(root, this);
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

export class CollectClientInfoTaskStep1AddFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP({});

  root: CollectClientInfoTaskInf;
  parent: CollectClientInfoTaskStep2MDP;

  constructor(
    root: CollectClientInfoTaskInf,
    parent: CollectClientInfoTaskStep2MDP
  ) {
    super({
      id: "addCreditorForm",
      myRef: "addCreditorFormRef",
      disabled: root.formDisabled,
    });
    this.root = root;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "creditor",
        label: "Creditor",
        mandatory: true,
        rules: "max:20",
        colWidth: 6,
      })
    )
      .addAction(
        new FBtnMDP({
          id: "cancelAddForm",
          label: "Cancel",
          outlined: true,
          onClick: this.cancelAddForm,
        })
      )
      .addAction(
        new FBtnMDP({
          id: "saveBtn",
          label: "Save",
          onClick: this.validateAndSave,
        })
      );
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRef];
  }

  cancelAddForm = () => {
    this.parent.getMyRef().closeAndClearAllForm();
  };

  validateAndSave = () => {
    this.getMyRef().onSubmit((form: any) => {
      this.parent.getMyRef().addCreditor();
    });
  };
}

export class CollectClientInfoTaskStep1EditFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP({});

  root: CollectClientInfoTaskInf;
  parent: CollectClientInfoTaskStep2MDP;

  constructor(
    root: CollectClientInfoTaskInf,
    parent: CollectClientInfoTaskStep2MDP
  ) {
    super({
      id: "editCreditorForm",
      myRef: "editCreditorFormRef",
      disabled: root.formDisabled,
    });
    this.root = root;
    this.parent = parent;

    this.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "creditor",
        label: "Creditor",
        mandatory: true,
        rules: "max:20",
        colWidth: 6,
      })
    )
      .addAction(
        new FBtnMDP({
          id: "cancelEditForm",
          label: "Cancel",
          outlined: true,
          onClick: this.cancelEditForm,
        })
      )
      .addAction(
        new FBtnMDP({
          id: "updateBtn",
          label: "Update",
          onClick: this.validateAndSave,
        })
      );
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRef];
  }

  cancelEditForm = () => {
    this.parent.getMyRef().closeAndClearAllForm();
  };

  validateAndSave = () => {
    this.getMyRef().onSubmit((form: any) => {
      this.parent.getMyRef().editCreditor();
    });
  };
}
