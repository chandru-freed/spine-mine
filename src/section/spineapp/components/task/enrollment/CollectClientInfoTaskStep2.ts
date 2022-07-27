// import {
//   TextField,
//   Form,
//   Button,
//   Step,
// } from "@/../src-def/form/FormComponentDef";

// import CollectClientInfoTaskStepInf from "./CollectClientInfoTaskStepInf";

// export class CollectClientInfoTaskStep2 {
//   root: CollectClientInfoTaskStepInf;

//   constructor(root: CollectClientInfoTaskStepInf) {
//     this.root = root;
//   }

//   formRefStr = "collectClientInfoRef";

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

//   stepConfig(): Step {
//     return new Step({
//       id: "collectClientInfo",
//       name: "Client Info",
//       formList: [
//         new Form({
//           id: "clientInfo",
//           formRef: this.formRefStr,
//           dataSelectorKey: "clientInfo",
//           fieldList: [
//             new TextField({
//               dataSelectorKey: "name",
//               label: "Name",
//               mandatory: true,
//               rules: "max:20",
//               colWidth: 6,
//             }),
//             new TextField({
//               dataSelectorKey: "mobile",
//               label: "Mobile",
//               mandatory: true,
//               rules: "max:20",
//               colWidth: 6,
//             }),
//             new TextField({
//               dataSelectorKey: "email",
//               label: "Email",
//               mandatory: true,
//               rules: "email",
//               colWidth: 12,
//             }),
//           ],
//           otherChildren: [
//             new Button({
//               id: "saveBtn",
//               label: "Save",
//               onClick: this.saveProfile,
//             }),
//             new Button({
//               id: "saveBtn",
//               label: "Save & Sync",
//               onClick: this.saveAndSync,
//             }),
//           ],
//         }),
//       ],
//     });
//   }
// }
