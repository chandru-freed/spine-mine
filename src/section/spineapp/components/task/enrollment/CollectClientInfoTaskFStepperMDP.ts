import FStepperMDP from "@/components/FStepperMDP";
import CollectClientInfoTaskProfileMDP from "./CollectClientInfoTaskProfileMDP";
import CollectClientInfoTaskCreditorMDP from "./CollectClientInfoTaskCreditorMDP";
import CollectClientInfoTaskInf from "./CollectClientInfoTaskInf";

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

    this.addStepMDP("Profile", new CollectClientInfoTaskProfileMDP(root, this));
    this.addStepMDP("Creditor", new CollectClientInfoTaskCreditorMDP(root));
  }

  getMyRef() {
    return this.root.$refs[this.myRef];
  }
}
