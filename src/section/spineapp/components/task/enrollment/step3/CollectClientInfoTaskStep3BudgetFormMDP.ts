import FFormMDP from "@/components/form/FFormMDP";
import { FFormChildMDP } from "@/components/form/FFormMDP";
import { CollectClientInfoTaskIntf } from "../CollectClientInfoTaskIntf";
import CollectClientInfoTaskStep3MDP from "./CollectClientInfoTaskStep3MDP";
import DebtRepaymentsFMiniFormMDP from "./mini-budget-form/DebtRepaymentsFMiniFormMDP";
import IncomeSourceFMiniFormMDP from "./mini-budget-form/IncomeSourceFMiniFormMDP";

export default class CollectClientInfoTaskStep3BudgetFormMDP extends FFormMDP {
  childMDP = new FFormChildMDP({});

  root: CollectClientInfoTaskIntf;
  parent: CollectClientInfoTaskStep3MDP;

  constructor(
    root: CollectClientInfoTaskIntf,
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
