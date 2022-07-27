// import {
//   SwitchMetaData,
//   FormMetaData,
//   ButtonMetaData,
//   StepMetaData,
// } from "@/../src-def/form/FormComponentDef";
// import { DocumentMetaData } from "@/../src-def/task/CollectClientInfoTaskDef";

// import CollectClientInfoTaskInf from "./CollectClientInfoTaskInf";

// export class CollectClientInfoTaskStep6 {
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
//       id: "documentList",
//       name: "Document List",
//     });
//     const form1 = new FormMetaData({
//       id: "documentList",
//       formRef: this.formRefStr,
//       dataSelectorKey: "documentList",
//       disabled: this.root.formDisabled,
//     });

//     step.addForm(form1);

//     form1
//       .addField(
//         new DocumentMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "documentList",
//           label: "Document",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addOtherChild(
//         new ButtonMetaData({
//           id: "saveBtn",
//           label: "Save",
//           outlined: true,
//           onClick: this.saveTask,
//         })
//       ).addOtherChild(
//         new ButtonMetaData({
//           id: "saveBtn",
//           label: "Save & Sync",
//           outlined: true,
//           onClick: this.saveTask,
//         })
//       );

//     return step;

//   }
// }
