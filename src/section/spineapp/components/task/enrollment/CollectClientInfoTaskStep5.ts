// import {
//   TextFieldMetaData,
//   FormMetaData,
//   ButtonMetaData,
//   StepMetaData,
//   EmailFieldMetaData,
//   AddressMetaData,
// } from "@/../src-def/form/FormComponentDef";

// import CollectClientInfoTaskInf from "./CollectClientInfoTaskInf";

// export class CollectClientInfoTaskStep5 {
//   root: CollectClientInfoTaskInf;

//   constructor(root: CollectClientInfoTaskInf) {
//     this.root = root;
//   }

//   formRefStr = "bankFormRef";

//   getFormRef() {
//     return (this.root.$refs[this.root.rootRef]! as any).$refs[
//       this.formRefStr
//     ][0];
//   }

//   saveProfile = () => {
//     const fFormRef = this.getFormRef();
//     fFormRef.onSubmit((profileForm: any) => {
//       this.root.saveTask();
//     });
//   };

//   saveAndSync = () => {
//     const fFormRef = this.getFormRef();
//     fFormRef.onSubmit((profileForm: any) => {
//       this.root.saveTask();
//     });
//   };

//   getMetaData(): StepMetaData {
//     const step = new StepMetaData({
//       id: "bankAccount",
//       name: "Bank Account",
//     });
//     const form1 = new FormMetaData({
//       id: "bankAccountInfo",
//       formRef: this.formRefStr,
//       dataSelectorKey: "bankAccountInfo",
//       disabled: this.root.formDisabled,
//     });

//     step.addForm(form1);

//     form1
//       .addField(
//         new TextFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "bankAccountHolderName",
//           label: "Account Holder Name",
//           mandatory: true,
//           rules: "max:20",
//           colWidth: 4,
//         })
//       )
//       .addField(
//         new TextFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "bankAccountNumber",
//           label: "Bank Account Number",
//           mandatory: true,
//           rules: "max:20",
//           colWidth: 4,
//         })
//       )
//       .addField(
//         new TextFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "accountType",
//           label: "Account Type",
//           mandatory: true,
//           colWidth: 4,
//         })
//       )
//       .addField(
//         new TextFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "ifscCode",
//           label: "IFSC Code",
//           mandatory: true,
//           rules: "max:20",
//           colWidth: 4,
//         })
//       )
//       .addField(
//         new TextFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "bankName",
//           disabled: true,
//           label: "Bank Name",
//           rules: "max:20",
//           colWidth: 4,
//         })
//       )
//       .addField(
//         new TextFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "bankBranch",
//           disabled: true,
//           label: "Bank Branch",
//           rules: "max:20",
//           colWidth: 4,
//         })
//       )
//       .addOtherChild(
//         new ButtonMetaData({
//           id: "saveBtn",
//           label: "Save",
//           outlined: true,
//           onClick: this.saveProfile,
//         })
//       )
//       .addOtherChild(
//         new ButtonMetaData({
//           id: "saveBtn",
//           label: "Save & Sync",
//           outlined: true,
//           onClick: this.saveAndSync,
//         })
//       );

//     return step;
//   }
// }
