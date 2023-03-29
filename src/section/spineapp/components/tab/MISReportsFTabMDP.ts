import FTabMDP from "@/components/generic/FTabMDP";

export default class MISReportsFTabMDP extends FTabMDP {
  // TO_BE_REMOVED
  taskRoot: any;

  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "misreportsFTabMDPRef",
    });
    this.taskRoot = taskRoot;

    this
    // .addTab({
    //   tabName: "Upcoming Payments",
    //   routerName: "Root.MISReports.UpcomingPayments",
    // })
    // .addTab({
    //   tabName: "Pending Payment List",
    //   routerName: "Root.Operation.PendingPaymentList",
    // })
    // .addTab({
    //   tabName: "Account Balance",
    //   routerName: "Root.MISReports.AccountBalance",
    // })
    .addTab({
      tabName: "Active Tasks",
      routerName: "Root.Operation.OPRActiveTaskList",
    })
    // .addTab({
    //   tabName: "Day Wise Payment",
    //   routerName: "Root.Operation.PaymentOperation",
    // })
    .addTab({
      tabName: "Active Tickets",
      routerName: "Root.Operation.OPRActiveTicketList",
    })
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
}
