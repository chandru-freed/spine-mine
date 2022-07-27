// import {
//   SwitchMetaData,
//   FormMetaData,
//   ButtonMetaData,
//   StepMetaData,
// } from "@/../src-def/form/FormComponentDef";

// import CollectClientInfoTaskInf from "./CollectClientInfoTaskInf";

// export class CollectClientInfoTaskStep7 {
//   root: CollectClientInfoTaskInf;

//   constructor(root: CollectClientInfoTaskInf) {
//     this.root = root;
//   }

//   formRefStr = "formRef";

//   getFormRef() {
//     return (this.root.$refs[this.root.rootRef]! as any).$refs[
//       this.formRefStr
//     ][0];
//   }

//   saveTask = () => {
//     const fFormRef = this.getFormRef();
//     fFormRef.onSubmit((profileForm: any) => {
//       this.root.saveTask();
//     });
//   };

//   completeTask = () => {
//     const fFormRef = this.getFormRef();
//     fFormRef.onSubmit((profileForm: any) => {
//       this.root.completeTask();
//     });
//   };

//   getMetaData(): StepMetaData {
//     const step = new StepMetaData({
//       id: "verificationInfoStep",
//       name: "Verification Info",
//     });
//     const form1 = new FormMetaData({
//       id: "verificationInfo",
//       formRef: this.formRefStr,
//       // dataSelectorKey: "clientInfo",
//       disabled: this.root.formDisabled,
//     });

//     step.addForm(form1);

//     form1
//       .addField(
//         new SwitchMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "needVerification",
//           label: "Need Verification",
//           mandatory: true,
//           colWidth: 6,
//         })
//       )
//       .addOtherChild(
//         new ButtonMetaData({
//           id: "saveBtn",
//           label: "Save",
//           outlined: true,
//           onClick: this.saveTask,
//         })
//       )
//       .addOtherChild(
//         new ButtonMetaData({
//           id: "completTask",
//           label: "Mark Complete",
//           outlined: true,
//           onClick: this.completeTask,
//         })
//       );

//     return step;

//   }
// }
