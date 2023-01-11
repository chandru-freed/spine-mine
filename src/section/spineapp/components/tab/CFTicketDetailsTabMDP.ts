import FTabMDP from "@/components/generic/FTabMDP";

export default class CFTicketDetailsTabMDP extends FTabMDP {
  taskRoot: any;
  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "CFticketFTabMDPRef",
    });
    this.taskRoot = taskRoot;

    this.addTab({
      tabName: "Comments",
      routerName: "Root.CFile.CFTicket.CFTicketDetails.CFTicketCommentList",
      
    }).addTab({
      tabName: "Documents",
      routerName: "Root.CFile.CFTicket.CFTicketDetails.CFTicketDocumentList",
    }).addTab({
      tabName: "Subscribers",
      routerName: "Root.CFile.CFTicket.CFTicketDetails.CFTicketSubscriberList",
    });
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
}
