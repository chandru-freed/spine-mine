import FTabMDP from "@/components/generic/FTabMDP";

export default class MISReportsFTabMDP extends FTabMDP {
  taskRoot: any;

  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "misreportsFTabMDPRef",
    });
    this.taskRoot = taskRoot;

    this.addTab({
      tabName: "Upcoming Payments",
      routerName: "Root.MISReports.UpcomingPayments",
    }).addTab({
      tabName: "Account Balance",
      routerName: "Root.MISReports.AccountBalance",
    }).addTab({
      tabName: "Day Wise Payment",
      routerName: "Root.Operation.PaymentOperation",
    });
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
}
