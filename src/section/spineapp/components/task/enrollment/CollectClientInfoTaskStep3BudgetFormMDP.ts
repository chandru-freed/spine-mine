import FFormMDP from "@/components/form/FFormMDP";
import { FFormChildMDP } from "@/components/form/FFormMDP";
import FTextFieldMDP from "@/components/form/field/FTextFieldMDP";
import { CollectClientInfoTaskInf } from "./CollectClientInfoTaskInf";
import CollectClientInfoTaskStep3MDP from "./CollectClientInfoTaskStep3MDP";
import DebtRepaymentsFMiniFormMDP from "./DebtRepaymentsFMiniFormMDP";
import IncomeSourceFMiniFormMDP from "./IncomeSourceFMiniFormMDP";

export default class CollectClientInfoTaskStep3BudgetFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP({});

  root: CollectClientInfoTaskInf;
  parent: CollectClientInfoTaskStep3MDP;

  constructor(
    root: CollectClientInfoTaskInf,
    parent: CollectClientInfoTaskStep3MDP
  ) {
    super({
      id: "mainBudgetForm",
      myRef: "mainBudgetFormRef",
      dataSelectorKey: "budgetInfo",
      disabled: root.formDisabled,
    });
    this.root = root;
    this.parent = parent;

    this.addField(new IncomeSourceFMiniFormMDP(this.root, this));
    this.addField(new DebtRepaymentsFMiniFormMDP(this.root, this));
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRef];
  }
}
