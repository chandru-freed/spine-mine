// import {
//   TextFieldMetaData,
//   SwitchMetaData,
//   FormMetaData,
//   ButtonMetaData,
//   StepMetaData,
//   MiniFormMetaData,
//   NumberFieldMetaData,
// } from "@/../src-def/form/FormComponentDef";
// import { BudgetMetaData } from "@/../src-def/task/CollectClientInfoTaskDef";

// import CollectClientInfoTaskInf from "./CollectClientInfoTaskInf";

// export class CollectClientInfoTaskStep3 {
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
//       id: "budget",
//       name: "Budget",
//     });
    

//     const budgetMetaData = new BudgetMetaData({
//       id: "budgetInfo",
//       parentDataProvider: step,
//       dataSelectorKey: "budgetInfo",
//     });
//     step.addComponent(budgetMetaData)

//     const form1 = new FormMetaData({
//       id: "budgetInfoMainForm",
//       formRef: this.formRefStr,
//       // dataSelectorKey: "budgetInfo",
//       disabled: this.root.formDisabled,
//     });

//     budgetMetaData.addForm(form1)

//     const incomeSources = new MiniFormMetaData({
//       parentDataProvider: form1,
//       componentName: "f-mini-form-with-total",
//       dataSelectorKey: "incomeSources",
//       label: "Income Sources",
//       mandatory: true,
//       colWidth: 4,
//     });

//     incomeSources
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "salary",
//           label: "Salary",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "business Income",
//           label: "Business Income",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "otherIncome",
//           label: "Other Income",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "familySupport",
//           label: "Family Support",
//           mandatory: true,
//           colWidth: 12,
//         })
//       );

//     const debtRepayments = new MiniFormMetaData({
//       parentDataProvider: form1,
//       componentName: "f-mini-form-with-total",
//       dataSelectorKey: "debtRepayments",
//       label: "Debt Repayments",
//       mandatory: true,
//       colWidth: 4,
//     });

//     debtRepayments
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "autoLoan",
//           label: "Auto Loan",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "housingLoan",
//           label: "Housing Loan",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "loanAgainstSecurity",
//           label: "Loan Against Security",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "collateralizedBussinessLoan",
//           label: "Collateralized Bussiness Loan",
//           mandatory: true,
//           colWidth: 12,
//         })
//       );

//     const livingExpense = new MiniFormMetaData({
//       parentDataProvider: form1,
//       componentName: "f-mini-form-with-total",
//       dataSelectorKey: "livingExpense",
//       label: "Living Expense",
//       mandatory: true,
//       colWidth: 4,
//     });

//     livingExpense
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "rentMaintenance",
//           label: "Rent / Maintenance",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "groceryExpense",
//           label: "Grocery Expense",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "electricityBill",
//           label: "Electricity Bill",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "gasBill",
//           label: "Gas Bill",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "phoneBill",
//           label: "Phone Bill",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "otherUtilityBill",
//           label: "Other Utility Bill",
//           mandatory: true,
//           colWidth: 12,
//         })
//       );

//     const lifestyleExpense = new MiniFormMetaData({
//       parentDataProvider: form1,
//       componentName: "f-mini-form-with-total",
//       dataSelectorKey: "lifestyleExpense",
//       label: "Lifestyle Expense",
//       mandatory: true,
//       colWidth: 4,
//     });

//     lifestyleExpense
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "travelFuel",
//           label: "Travel / Fuel",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "groceryExpense",
//           label: "Grocery Expense",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "digitalSubscription",
//           label: "Digital Subscription",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "dinningOutOrdering",
//           label: "Dining Out / Ordering",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "houseHelp",
//           label: "House Help",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "outingsShopping",
//           label: "Outings / Shopping",
//           mandatory: true,
//           colWidth: 12,
//         })
//       );

//     const dependentExpense = new MiniFormMetaData({
//       parentDataProvider: form1,
//       componentName: "f-mini-form-with-total",
//       dataSelectorKey: "dependentExpense",
//       label: "Dependent Expense",
//       mandatory: true,
//       colWidth: 4,
//     });

//     dependentExpense
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "medicalBills",
//           label: "Medical Bills",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "essentialCare",
//           label: "Essential Care",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "schoolFee",
//           label: "School Fee",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "School Bus",
//           label: "School Bus",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "booksAndProjects",
//           label: "Books And Projects",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "nursingCareAttendent",
//           label: "Nursing / Care Attendent",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "petCare",
//           label: "Pet Care",
//           mandatory: true,
//           colWidth: 12,
//         })
//       );

//     const incidentalExpense = new MiniFormMetaData({
//       parentDataProvider: form1,
//       componentName: "f-mini-form-with-total",
//       dataSelectorKey: "incidentalExpense",
//       label: "Incidental Expense",
//       mandatory: true,
//       colWidth: 4,
//     });

//     incidentalExpense
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "healthInsurance",
//           label: "Health Insurance",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "vehicleInsurance",
//           label: "Vehicle Insurance",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "sip",
//           label: "SIP",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "School Bus",
//           label: "School Bus",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "stockTrades",
//           label: "Stock Trades",
//           mandatory: true,
//           colWidth: 12,
//         })
//       )
//       .addField(
//         new NumberFieldMetaData({
//           parentDataProvider: form1,
//           dataSelectorKey: "otherExpense",
//           label: "Other Expense",
//           mandatory: true,
//           colWidth: 12,
//         })
//       );

//     const miscellaneousExpense = new MiniFormMetaData({
//       parentDataProvider: form1,
//       componentName: "f-mini-form-with-total",
//       dataSelectorKey: "miscellaneousExpense",
//       label: "Miscellaneous Expense",
//       mandatory: true,
//       colWidth: 4,
//     });

//     miscellaneousExpense.addField(
//       new NumberFieldMetaData({
//         parentDataProvider: form1,
//         dataSelectorKey: "miscellaneousExpenses",
//         label: "Miscellaneous Expense",
//         mandatory: true,
//         colWidth: 12,
//       })
//     );
//     form1
//       .addField(incomeSources)
//       .addField(debtRepayments)
//       .addField(livingExpense)
//       .addField(lifestyleExpense)
//       .addField(dependentExpense)
//       .addField(incidentalExpense)
//       .addField(miscellaneousExpense);

//       budgetMetaData
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
