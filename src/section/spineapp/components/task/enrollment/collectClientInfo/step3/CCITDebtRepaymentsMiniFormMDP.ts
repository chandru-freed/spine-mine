import { FFormChildMDP } from "@/components/generic/form/FFormMDP";
import FBudgetMiniFormMDP from "@/components/generic/form/field/FBudgetMiniFormMDP";
import FCurrencyFieldMDP from "@/components/generic/form/field/FCurrencyFieldMDP";
import { CollectClientInfoTaskIntf } from "../CollectClientInfoTaskIntf";

export default class CCITDebtRepaymentsMiniFormMDP extends FBudgetMiniFormMDP {
  childMDP = new FFormChildMDP();
  taskRoot: CollectClientInfoTaskIntf;
  parent: any;
  constructor({ taskRoot, parent }: { taskRoot: CollectClientInfoTaskIntf; parent: any }) {
    super({
      parentMDP: new FFormChildMDP(),
      dataSelectorKey: "debtRepayments",
      disabled: taskRoot.taskDisabled,
      label: "Debt Repayments",
      mandatory: true,
      boundaryClass: "col-4",
    });
    this.taskRoot = taskRoot;
    this.parent = parent;

    this.addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "autoLoan",
        label: "Auto Loan",
        mandatory: true,
      })
    )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "housingLoan",
          label: "Housing Loan",
          mandatory: true,
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "loansAgainstSecurity",
          label: "Loans Against Security",
          mandatory: true,
        })
      )
      .addField(
        new FCurrencyFieldMDP({
          parentMDP: this.childMDP,
          dataSelectorKey: "collateralizedBussinessLoan",
          label: "Collateralized Bussiness Loan",
          mandatory: true,
        })
      );
  }
}
