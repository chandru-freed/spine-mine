import FTabMDP from "@/components/generic/FTabMDP";

export default class DashboardFTabMDP extends FTabMDP {
  taskRoot: any;

  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "dashboardFTabMDPRef",
    });
    this.taskRoot = taskRoot;


    this.addTab({
      tabName: "DCP",
      routerName: "Root.Dashboard.DCPDashboard",
    }).addTab({
      tabName: "DRP",
      routerName: "Root.Dashboard.DRPDashboard",
    }).addTab({
      tabName: "Daily Sales",
      routerName: "Root.Report.SalesReport.DailySalesReport",
    })
    .addTab({
      tabName: "Active Partners",
      routerName: "Root.Dashboard.ActivePartnerList",
    })
    .addTab({
      tabName: "Requested Partners",
      routerName: "Root.Dashboard.RequestedPartnerList",
    })
    
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
}
