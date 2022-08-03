import { MDP } from "@/components/MDP";
import FFormMDP from "@/components/form/FFormMDP";
import { FFormChildMDP } from "@/components/form/FFormMDP";
import FTextFieldMDP from "@/components/form/field/FTextFieldMDP";
import {
  CollectClientInfoTaskFStepperMDP,
  CollectClientInfoTaskInf,
} from "./CollectClientInfoTaskInf";
import FBtnMDP from "@/components/FBtnMDP";
import FMiniFormMDP from "@/components/form/field/FMiniFormMDP";
import IncomeSourceFMiniFormMDP from "./IncomeSourceFMiniFormMDP";
import DebtRepaymentsFMiniFormMDP from "./DebtRepaymentsFMiniFormMDP";

export default class CollectClientInfoTaskStep3MDP implements MDP {
  childMDP = new FFormChildMDP({});
  root: CollectClientInfoTaskInf;
  parent: CollectClientInfoTaskFStepperMDP;

  componentName = "CollectClientInfoTaskStep3";

  id: string;
  myRef: string;
  dataSelectorKey?: string;
  disabled: boolean;

  budgetRelevantFormMDP: FFormMDP;
  budgetFormMDP: FFormMDP;
  actionListMDP: FBtnMDP[] = [];

  constructor(
    root: CollectClientInfoTaskInf,
    parent: CollectClientInfoTaskFStepperMDP
  ) {
    this.root = root;
    this.parent = parent;
    this.id = "budgetInfo";
    this.myRef = "budgetInfoRef";
    this.disabled = root.formDisabled;

    this.budgetRelevantFormMDP = new FFormMDP({
      id: "budgetRelevantForm",
      myRef: "budgetRelevantFormRef",
      disabled: true,
      dataSelectorKey: "clientInfo"
    });
    this.budgetRelevantFormMDP.addField(
      new FTextFieldMDP({
        parentMDP: this.childMDP,
        dataSelectorKey: "name",
        label: "Full Name",
        mandatory: true,
        rules: "max:20",
        colWidth: 12,
      })
    );

    this.budgetFormMDP = new FFormMDP({
      id: "mainBudgetForm",
      myRef: "mainBudgetFormRef",
      dataSelectorKey: "budgetInfo",
      disabled: root.formDisabled,
    });

    this.budgetFormMDP.addField(new IncomeSourceFMiniFormMDP(this.root, this));
    this.budgetFormMDP.addField(
      new DebtRepaymentsFMiniFormMDP(this.root, this)
    );

    this.actionListMDP.push(
      new FBtnMDP({
        id: "saveBtn",
        label: "Save",
        outlined: true,
        onClick: this.root.saveTask,
      })
    );
  }

  getMyRef() {
    return this.parent.getMyRef().$refs[this.myRef][0];
  }

  getMetaData(): object {
    return {
      componentName: this.componentName,
      id: this.id,
      myRef: this.myRef,
      dataSelectorKey: this.dataSelectorKey,
      props: {
        id: this.id,
        myRef: this.myRef,
        name: this.myRef,
        budgetRelevantFormMetaData: this.budgetRelevantFormMDP.getMetaData(),
        budgetFormMetaData: this.budgetFormMDP.getMetaData(),
        actionListMetaData: this.actionListMDP.map((mdp) => mdp.getMetaData()),
        disabled: this.disabled,
      },
    };
  }
}
