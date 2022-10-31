import FTabMDP from "@/components/generic/FTabMDP";

export default class MyTicketFTabMDP extends FTabMDP {
  taskRoot: any;

  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "taskFTabMDPRef",
    });
    this.taskRoot = taskRoot;

    this.addTab({
      tabName: "Active",
      routerName: "Root.MyTicket.ActiveTicketList",
    }).addTab({
      tabName: "Completed",
      routerName: "Root.MyTicket.CompletedTicketList",
    });
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
}
