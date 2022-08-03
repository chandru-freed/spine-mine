import {
  CollectClientInfoTaskInf,
  CollectClientInfoTaskStep1MDP,
  CollectClientInfoTaskStep2MDP,
  CollectClientInfoTaskStep3MDP,
  FStepperMDP,
} from "./CollectClientInfoTaskInf";

export default class CollectClientInfoTaskFStepperMDP extends FStepperMDP {
  root: CollectClientInfoTaskInf;

  constructor({
    root,
    myRef = "myStepperRef", //todo:  change it to myRefName in all places
  }: {
    root: CollectClientInfoTaskInf;
    myRef?: string;
  }) {
    super({ myRef: myRef });
    this.root = root;

    this.addStepMDP("Profile", new CollectClientInfoTaskStep1MDP(root, this));
    this.addStepMDP("Creditor", new CollectClientInfoTaskStep2MDP(root, this));
    this.addStepMDP("Budget", new CollectClientInfoTaskStep3MDP(root, this));
  }

  getMyRef() {
    console.log("CollectClientInfoTaskFStepperMDP")
    console.log(this.root.$refs[this.myRef]);
    return this.root.$refs[this.myRef];
  }
}
