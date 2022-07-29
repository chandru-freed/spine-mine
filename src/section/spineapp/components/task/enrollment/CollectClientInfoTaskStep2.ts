import {
  TextFieldMetaData,
  FormMetaData,
  StepMetaData,
  CreditorMetaData,
  SelectFieldMetaData,
  NumberFieldMetaData,
  ButtonMetaData,
} from "@/../src-def/form/FormComponentDef";

import CollectClientInfoTaskInf from "./CollectClientInfoTaskInf";

export class CollectClientInfoTaskStep2 {
  root: CollectClientInfoTaskInf;

  constructor(root: CollectClientInfoTaskInf) {
    this.root = root;
  }

  formRefStr = "creditorInfoRef";

  getFormRef() {
    return (this.root.$refs[this.root.rootRef]! as any).$refs[
      this.formRefStr
    ][0];
  }

  saveProfile = () => {
    const fFormRef = this.getFormRef();
    fFormRef.onSubmit((form: any) => {
      this.root.saveTask();
    });
  };

  saveAndSync = () => {
    const fFormRef = this.getFormRef();
    fFormRef.onSubmit((form: any) => {
      this.root.saveTask();
    });
  };


  getMetaData(): StepMetaData {
    

    const creditorComponent = new CreditorMetaData({
      root: this.root,
      id: "creditorList",
      dataSelectorKey: "creditorList",
      disabled: this.root.formDisabled,
      onChange: this.root.saveTask // directly calling as there is no form validation.
    });

    creditorComponent.addAction(
      new ButtonMetaData({
        id: "saveBtn",
        label: "Save",
        outlined: true,
        onClick: this.root.saveTask, // TODO : How to call with validation.
      })
    );

    const step = new StepMetaData({
      id: "collectCreditorList",
      name: "Creditors",
      component: creditorComponent,
    });

    return step;
  }
}
