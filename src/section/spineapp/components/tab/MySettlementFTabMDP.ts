import FTabMDP from "@/components/generic/FTabMDP";

export default class MySettlementFTabMDP extends FTabMDP {
  taskRoot: any;

  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "mySettlementFTabMDPRef",
    });
    this.taskRoot = taskRoot;

    this.addTab({
      tabName: "Accounts Nearing Settlement",
      routerName: "Root.Settlement.FiCreditorSettlementList",
    }).addTab({
      tabName: "Accounts Settled",
      routerName: "Root.Settlement.FiCreditorSettledList",
    })
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
}
