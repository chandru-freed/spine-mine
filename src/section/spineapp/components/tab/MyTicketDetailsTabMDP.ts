import FTabMDP from "@/components/generic/FTabMDP";

export default class MyTicketDetailsTabMDP extends FTabMDP {
  taskRoot: any;

  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "ticketFTabMDPRef",
    });
    this.taskRoot = taskRoot;

    this.addTab({
      tabName: "Comments",
      routerName: "Root.MyTicket.MyTicketDetails.MyTicketCommentList",
    }).addTab({
      tabName: "Documents",
      routerName: "Root.MyTicket.MyTicketDetails.MyTicketDocumentList",
    }).addTab({
      tabName: "Subscribers",
      routerName: "Root.MyTicket.MyTicketDetails.MyTicketSubscriberList",
    });
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
}
