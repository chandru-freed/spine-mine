import {
  TextFieldMetaData,
  FormMetaData,
  ButtonMetaData,
  StepMetaData,
  EmailFieldMetaData,
  AddressMetaData,
  ComponentMetaDataProvider,
  TextareaMetaData,
} from "@/../src-def/form/FormComponentDef";

import CollectClientInfoTaskInf from "./CollectClientInfoTaskInf";

export class CollectClientInfoTaskStep1 {
  root: CollectClientInfoTaskInf;

  constructor(root: CollectClientInfoTaskInf) {
    this.root = root;
  }

  formRefStr = "collectClientInfoRef";

  getFormRef() {
    return (this.root.$refs[this.root.rootRef]! as any).$refs[
      this.formRefStr
    ][0];
  }

  saveProfile = () => {
    const fFormRef = this.getFormRef();
    fFormRef.onSubmit((profileForm: any) => {
      this.root.saveTask();
    });
  };

  saveAndSync = () => {
    const fFormRef = this.getFormRef();
    fFormRef.onSubmit((profileForm: any) => {
      this.root.saveTask();
    });
  };

  getMetaData(): StepMetaData {
    const form1 = new FormMetaData({
      id: "clientInfo",
      formRef: this.formRefStr,
      dataSelectorKey: "clientInfo",
      disabled: this.root.formDisabled,
    });
    form1
      .addField(
        new TextFieldMetaData({
          parentDataProvider: form1,
          dataSelectorKey: "firstName",
          label: "First Name",
          mandatory: true,
          rules: "max:20",
          colWidth: 6,
        })
      )
      .addField(
        new TextFieldMetaData({
          parentDataProvider: form1,
          dataSelectorKey: "lastName",
          label: "Last Name",
          mandatory: true,
          rules: "max:20",
          colWidth: 6,
        })
      )
      .addField(
        new EmailFieldMetaData({
          parentDataProvider: form1,
          dataSelectorKey: "email",
          label: "Email",
          mandatory: true,
          colWidth: 4,
        })
      )
      .addField(
        new TextFieldMetaData({
          parentDataProvider: form1,
          dataSelectorKey: "mobile",
          label: "Mobile",
          mandatory: true,
          rules: "max:20",
          colWidth: 4,
        })
      )
      .addField(
        new TextFieldMetaData({
          parentDataProvider: form1,
          dataSelectorKey: "secondaryPhone",
          label: "Secondary Phone Number",
          mandatory: true,
          rules: "max:20",
          colWidth: 4,
        })
      )
      .addField(
        new TextFieldMetaData({
          parentDataProvider: form1,
          dataSelectorKey: "motherName",
          label: "Mother's Name",
          mandatory: true,
          rules: "max:20",
          colWidth: 6,
        })
      )
      .addField(
        new TextFieldMetaData({
          parentDataProvider: form1,
          dataSelectorKey: "fatherName",
          label: "Father's Name",
          mandatory: true,
          rules: "max:20",
          colWidth: 6,
        })
      )
      .addField(
        new TextFieldMetaData({
          parentDataProvider: form1,
          dataSelectorKey: "panNumber",
          label: "PAN Number",
          mandatory: true,
          rules: "max:20",
          colWidth: 6,
        })
      )
      .addField(
        new TextFieldMetaData({
          parentDataProvider: form1,
          dataSelectorKey: "dob",
          label: "Date Of Birth",
          mandatory: true,
          rules: "max:20",
          colWidth: 6,
        })
      )
      .addField(
        new AddressMetaData({
          parentDataProvider: form1,
          dataSelectorKey: "address",
          label: "Address",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new TextareaMetaData({
          parentDataProvider: form1,
          dataSelectorKey: "description",
          label: "Description",
          colWidth: 6,
        })
      )
      .addOtherChild(
        new ButtonMetaData({
          id: "saveBtn",
          label: "Save",
          outlined: true,
          onClick: this.saveProfile,
        })
      )
      .addOtherChild(
        new ButtonMetaData({
          id: "saveBtn",
          label: "Save & Sync",
          outlined: true,
          onClick: this.saveAndSync,
        })
      );

    const step = new StepMetaData({
      id: "collectClientInfo",
      name: "Client Info",
      component: form1,
    });

    return step;
  }
}
