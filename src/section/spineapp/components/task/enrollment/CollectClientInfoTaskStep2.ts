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
    const addCreditorFormMetaData = new FormMetaData({
      id: "addCreditorForm",
      formRef: this.formRefStr,
      dataSelectorKey: "addCreditorForm",
      disabled: this.root.formDisabled,
    });

    addCreditorFormMetaData
      .addField(
        new TextFieldMetaData({
          parentDataProvider: addCreditorFormMetaData,
          dataSelectorKey: "creditor",
          label: "Creditor",
          mandatory: true,
          rules: "max:20",
          colWidth: 6,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: addCreditorFormMetaData,
          dataSelectorKey: "creditorBalance",
          label: "Creditor Balance",
          mandatory: true,
          rules: "max:20",
          colWidth: 6,
        })
      )
      .addField(
        new TextFieldMetaData({
          parentDataProvider: addCreditorFormMetaData,
          dataSelectorKey: "lastDateOfPayment",
          label: "Last Date Of Payment",
          mandatory: true,
          rules: "max:20",
          colWidth: 4,
          mask:"##/##/####",
          placeholder: "dd/mm/yyyy"
        })
      )
      .addField(
        new SelectFieldMetaData({
          parentDataProvider: addCreditorFormMetaData,
          dataSelectorKey: "debtType",
          label: "Debt Type",
          mandatory: true,
          rules: "max:20",
          colWidth: 4,
          options: ["Credit Card", "Personal Loans", "Secured", "Others"],
        })
      )
      .addField(
        new TextFieldMetaData({
          parentDataProvider: addCreditorFormMetaData,
          dataSelectorKey: "accountNumber",
          label: "Account Number",
          mandatory: true,
          rules: "max:20",
          colWidth: 4,
        })
      );

    const editCreditorFormMetaData = new FormMetaData({
      id: "editCreditorForm",
      formRef: this.formRefStr,
      dataSelectorKey: "editCreditorForm",
      disabled: this.root.formDisabled,
    });

    editCreditorFormMetaData
      .addField(
        new TextFieldMetaData({
          parentDataProvider: editCreditorFormMetaData,
          dataSelectorKey: "creditor",
          label: "Creditor",
          mandatory: true,
          rules: "max:20",
          colWidth: 6,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: editCreditorFormMetaData,
          dataSelectorKey: "creditorBalance",
          label: "Creditor Balance",
          mandatory: true,
          rules: "max:20",
          colWidth: 6,
        })
      )
      .addField(
        new TextFieldMetaData({
          parentDataProvider: editCreditorFormMetaData,
          dataSelectorKey: "lastDateOfPayment",
          label: "Last Date Of Payment",
          mandatory: true,
          rules: "max:20",
          colWidth: 4,
        })
      )
      .addField(
        new SelectFieldMetaData({
          parentDataProvider: editCreditorFormMetaData,
          dataSelectorKey: "debtType",
          label: "Debt Type",
          mandatory: true,
          rules: "max:20",
          colWidth: 4,
          options: ["Credit Card", "Personal Loans", "Secured", "Others"],
        })
      )
      .addField(
        new TextFieldMetaData({
          parentDataProvider: editCreditorFormMetaData,
          dataSelectorKey: "accountNumber",
          label: "Account Number",
          mandatory: true,
          rules: "max:20",
          colWidth: 4,
        })
      );

    const creditorComponent = new CreditorMetaData({
      id: "creditorList",
      dataSelectorKey: "creditorList",
      addCreditorFormMetaData: addCreditorFormMetaData,
      editCreditorFormMetaData: editCreditorFormMetaData,
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
