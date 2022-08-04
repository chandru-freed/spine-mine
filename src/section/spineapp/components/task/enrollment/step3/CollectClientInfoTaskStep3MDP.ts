import { MDP } from "@/components/MDP";
import FFormMDP from "@/components/form/FFormMDP";
import { FFormChildMDP } from "@/components/form/FFormMDP";
import {
  CollectClientInfoTaskFStepperMDP,
  CollectClientInfoTaskIntf,
} from "../CollectClientInfoTaskIntf"
import FBtnMDP from "@/components/FBtnMDP";
import CollectClientInfoTaskStep3ProfileFormMDP from "./CollectClientInfoTaskStep3ProfileFormMDP";
import CollectClientInfoTaskStep3BudgetFormMDP from "./CollectClientInfoTaskStep3BudgetFormMDP";

export default class CollectClientInfoTaskStep3MDP implements MDP {
  childMDP = new FFormChildMDP({});
  root: CollectClientInfoTaskIntf;
  parent: CollectClientInfoTaskFStepperMDP;

  componentName = "CollectClientInfoTaskStep3";

  id: string;
  myRef: string;
  dataSelectorKey?: string;
  disabled: boolean;

  profileFormMDP: CollectClientInfoTaskStep3ProfileFormMDP;
  budgetFormMDP: FFormMDP;
  actionListMDP: FBtnMDP[] = [];

  constructor(
    root: CollectClientInfoTaskIntf,
    parent: CollectClientInfoTaskFStepperMDP
  ) {
    this.root = root;
    this.parent = parent;
    this.id = "budgetInfo";
    this.myRef = "budgetInfoRef";
    this.disabled = root.formDisabled;

    this.profileFormMDP = new CollectClientInfoTaskStep3ProfileFormMDP(
      this.root,
      this
    );

    this.budgetFormMDP = new CollectClientInfoTaskStep3BudgetFormMDP(
      this.root,
      this
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
        profileFormMetaData: this.profileFormMDP.getMetaData(),
        budgetFormMetaData: this.budgetFormMDP.getMetaData(),
        actionListMetaData: this.actionListMDP.map((mdp) => mdp.getMetaData()),
        disabled: this.disabled,
      },
    };
  }
}
