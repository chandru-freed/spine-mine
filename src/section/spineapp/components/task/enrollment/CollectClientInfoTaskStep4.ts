// import {
//   TextFieldMetaData,
//   NumberFieldMetaData,
//   FormMetaData,
//   ButtonMetaData,
//   StepMetaData,
// } from "@/../src-def/form/FormComponentDef";
// import { PaymentPlanMetaData } from "@/../src-def/task/CollectClientInfoTaskDef";

// import CollectClientInfoTaskInf from "./CollectClientInfoTaskInf";

// export class CollectClientInfoTaskStep4 {
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
//       id: "paymentPlan",
//       name: "Payment Plan",
//     });
//     const calculatorForm = new FormMetaData({
//       id: "paymentCalculatorForm",
//       formRef: this.formRefStr,
//     });

//     calculatorForm
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: calculatorForm,
//           dataSelectorKey: "totalDebtAmount",
//           label: "Total Debt",
//           mandatory: true,
//           rules: "max:20",
//           colWidth: 4,
//           disabled: true,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: calculatorForm,
//           dataSelectorKey: "payDay",
//           label: "Pay Day",
//           mandatory: true,
//           rules: "max:20",
//           colWidth: 4,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: calculatorForm,
//           dataSelectorKey: "feePercentage",
//           label: "Fee Percentage",
//           mandatory: true,
//           rules: "max:20",
//           colWidth: 4,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: calculatorForm,
//           dataSelectorKey: "totalFee",
//           label: "Total Fee",
//           mandatory: true,
//           rules: "max:20",
//           colWidth: 4,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: calculatorForm,
//           dataSelectorKey: "settlementPercentage",
//           label: "Settlement Percentage",
//           mandatory: true,
//           rules: "max:20",
//           colWidth: 4,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: calculatorForm,
//           dataSelectorKey: "totalAmountToBePaid",
//           label: "Total Amount To Be Paid",
//           mandatory: true,
//           rules: "max:20",
//           colWidth: 4,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: calculatorForm,
//           dataSelectorKey: "tenure",
//           label: "Tenure (months)",
//           mandatory: true,
//           rules: "max:20",
//           colWidth: 4,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: calculatorForm,
//           dataSelectorKey: "emiStartDate",
//           label: "EMI  Start Date",
//           mandatory: true,
//           rules: "max:20",
//           colWidth: 4,
//         })
//       )
//       .addOtherChild(
//         new ButtonMetaData({
//           id: "saveBtn",
//           label: "Calculate",
//           outlined: true,
//           onClick: this.saveTask,
//         })
//       );

//     const comp1 = new PaymentPlanMetaData({
//       id: "paymentPlan",
//       parentDataProvider: step,
//       form: calculatorForm,
//     });

//     step.addComponent(comp1);

//     comp1
//       .addAction(
//         new ButtonMetaData({
//           id: "saveBtn",
//           label: "Save",
//           outlined: true,
//           onClick: this.saveTask,
//         })
//       )
//       .addAction(
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
