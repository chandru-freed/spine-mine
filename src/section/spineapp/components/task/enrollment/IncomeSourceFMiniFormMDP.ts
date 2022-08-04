
import { FFormChildMDP } from "@/components/form/FFormMDP";
import FBudgetMiniFormMDP from "@/components/form/field/FBudgetMiniFormMDP";
import FCurrencyFieldMDP from "@/components/form/field/FCurrencyFieldMDP";
import FMiniFormMDP from "@/components/form/field/FMiniFormMDP";
import FNumberFieldMDP from "@/components/form/field/FNumberFieldMDP";
import FTextFieldMDP from "@/components/form/field/FTextFieldMDP";
import { CollectClientInfoTaskInf } from "./CollectClientInfoTaskInf";
import CollectClientInfoTaskStep3BudgetFormMDP from "./CollectClientInfoTaskStep3BudgetFormMDP";

export default class IncomeSourceFMiniFormMDP extends FBudgetMiniFormMDP {
  childMDP = new FFormChildMDP({});

  root: CollectClientInfoTaskInf;
  parent: CollectClientInfoTaskStep3BudgetFormMDP

  constructor(
    root: CollectClientInfoTaskInf,
    parent: CollectClientInfoTaskStep3BudgetFormMDP
  ) {
    super({
      parentMDP: new FFormChildMDP({}),
      id: "incomeSources",
      myRef: "incomeSourcesRef",
      dataSelectorKey: "incomeSources",
      label: "Income Source",
      colWidth: 6,
    });
    this.root = root;
    this.parent = parent;

    this.addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "salary",
        label: "Salary",
        mandatory: true,
        colWidth: 12,
      })
    ).addField(
      new FCurrencyFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "businessIncome",
        label: "Business Income",
        mandatory: true,
        colWidth: 12,
      })
    )
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRef][0];
  }

}
