import {
  TextFieldMetaData,
  SwitchMetaData,
  FormMetaData,
  ButtonMetaData,
  StepMetaData,
  MiniFormMetaData,
  NumberFieldMetaData,
  BudgetMetaData,
} from "@/../src-def/form/FormComponentDef";

import CollectClientInfoTaskInf from "./CollectClientInfoTaskInf";

export class CollectClientInfoTaskStep3 {
  root: CollectClientInfoTaskInf;

  constructor(root: CollectClientInfoTaskInf) {
    this.root = root;
  }

  componentRefStr = "componentRef";

  getFormRef() {
    return (this.root.$refs[this.root.rootRef]! as any).$refs[
      this.componentRefStr
    ][0];
  }

  saveTask = () => {
    const fFormRef = this.getFormRef();
    console.log(fFormRef);
    fFormRef.onSubmit((profileForm: any) => {
      this.root.saveTask();
    });
  };

  completeTask = () => {
    const fFormRef = this.getFormRef();
    fFormRef.onSubmit((profileForm: any) => {
      this.root.completeTask();
    });
  };

  getMetaData(): StepMetaData {
    const budgetFormMetaData = new FormMetaData({
      id: "budgetInfoMainForm",
      componentRef: this.componentRefStr,
      // dataSelectorKey: "budgetInfo",
      disabled: this.root.formDisabled,
    });

    const incomeSources = new MiniFormMetaData({
      parentDataProvider: budgetFormMetaData,
      componentName: "f-mini-form-with-total",
      dataSelectorKey: "incomeSources",
      label: "Income Sources",
      mandatory: true,
      colWidth: 4,
      minHeight: 600
    });

    incomeSources
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "salary",
          label: "Salary",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "business Income",
          label: "Business Income",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "otherIncome",
          label: "Other Income",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "familySupport",
          label: "Family Support",
          mandatory: true,
          colWidth: 12,
        })
      );

    const debtRepayments = new MiniFormMetaData({
      parentDataProvider: budgetFormMetaData,
      componentName: "f-mini-form-with-total",
      dataSelectorKey: "debtRepayments",
      label: "Debt Repayments",
      mandatory: true,
      colWidth: 4,
      minHeight: 600
    });

    debtRepayments
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "autoLoan",
          label: "Auto Loan",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "housingLoan",
          label: "Housing Loan",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "loanAgainstSecurity",
          label: "Loan Against Security",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "collateralizedBussinessLoan",
          label: "Collateralized Bussiness Loan",
          mandatory: true,
          colWidth: 12,
        })
      );

    const livingExpense = new MiniFormMetaData({
      parentDataProvider: budgetFormMetaData,
      componentName: "f-mini-form-with-total",
      dataSelectorKey: "livingExpense",
      label: "Living Expense",
      mandatory: true,
      colWidth: 4,
      minHeight: 600
    });

    livingExpense
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "rentMaintenance",
          label: "Rent / Maintenance",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "groceryExpense",
          label: "Grocery Expense",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "electricityBill",
          label: "Electricity Bill",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "gasBill",
          label: "Gas Bill",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "phoneBill",
          label: "Phone Bill",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "otherUtilityBill",
          label: "Other Utility Bill",
          mandatory: true,
          colWidth: 12,
        })
      );

    const lifestyleExpense = new MiniFormMetaData({
      parentDataProvider: budgetFormMetaData,
      componentName: "f-mini-form-with-total",
      dataSelectorKey: "lifestyleExpense",
      label: "Lifestyle Expense",
      mandatory: true,
      colWidth: 4,
      minHeight: 600
    });

    lifestyleExpense
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "travelFuel",
          label: "Travel / Fuel",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "groceryExpense",
          label: "Grocery Expense",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "digitalSubscription",
          label: "Digital Subscription",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "dinningOutOrdering",
          label: "Dining Out / Ordering",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "houseHelp",
          label: "House Help",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "outingsShopping",
          label: "Outings / Shopping",
          mandatory: true,
          colWidth: 12,
        })
      );

    const dependentExpense = new MiniFormMetaData({
      parentDataProvider: budgetFormMetaData,
      componentName: "f-mini-form-with-total",
      dataSelectorKey: "dependentExpense",
      label: "Dependent Expense",
      mandatory: true,
      colWidth: 4,
      minHeight: 600
    });

    dependentExpense
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "medicalBills",
          label: "Medical Bills",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "essentialCare",
          label: "Essential Care",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "schoolFee",
          label: "School Fee",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "School Bus",
          label: "School Bus",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "booksAndProjects",
          label: "Books And Projects",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "nursingCareAttendent",
          label: "Nursing / Care Attendent",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "petCare",
          label: "Pet Care",
          mandatory: true,
          colWidth: 12,
        })
      );

    const incidentalExpense = new MiniFormMetaData({
      parentDataProvider: budgetFormMetaData,
      componentName: "f-mini-form-with-total",
      dataSelectorKey: "incidentalExpense",
      label: "Incidental Expense",
      mandatory: true,
      colWidth: 4,
      minHeight: 600
    });

    incidentalExpense
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "healthInsurance",
          label: "Health Insurance",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "vehicleInsurance",
          label: "Vehicle Insurance",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "sip",
          label: "SIP",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "School Bus",
          label: "School Bus",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "stockTrades",
          label: "Stock Trades",
          mandatory: true,
          colWidth: 12,
        })
      )
      .addField(
        new NumberFieldMetaData({
          parentDataProvider: budgetFormMetaData,
          dataSelectorKey: "otherExpense",
          label: "Other Expense",
          mandatory: true,
          colWidth: 12,
        })
      );

    const miscellaneousExpense = new MiniFormMetaData({
      parentDataProvider: budgetFormMetaData,
      componentName: "f-mini-form-with-total",
      dataSelectorKey: "miscellaneousExpense",
      label: "Miscellaneous Expense",
      mandatory: true,
      colWidth: 4,
    });

    miscellaneousExpense.addField(
      new NumberFieldMetaData({
        parentDataProvider: budgetFormMetaData,
        dataSelectorKey: "miscellaneousExpenses",
        label: "Miscellaneous Expense",
        mandatory: true,
        colWidth: 12,
      })
    );

    budgetFormMetaData
      .addField(incomeSources)
      .addField(debtRepayments)
      .addField(livingExpense)
      .addField(lifestyleExpense)
      .addField(dependentExpense)
      .addField(incidentalExpense)
      .addField(miscellaneousExpense);

    const budgetMetaData = new BudgetMetaData({
      id: "budgetInfo",
      dataSelectorKey: "budgetInfo",
      formMetaData: budgetFormMetaData,
      disabled: this.root.formDisabled,
    });

    budgetMetaData.addAction(
      new ButtonMetaData({
        id: "saveBtn",
        label: "Save",
        outlined: true,
        onClick: this.saveTask,
      })
    );

    const step = new StepMetaData({
      id: "budget",
      name: "Budget",
      component: budgetMetaData,
    });

    return step;
  }
}
