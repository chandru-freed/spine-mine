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
    })
    // .addTab({
    //   tabName: "Daily Sales",
    //   routerName: "Root.Report.SalesReport.DailySalesReport",
    // })
    .addTab({
      tabName: "Active Partners",
      routerName: "Root.Dashboard.ActivePartnerList",
    })
    .addTab({
      tabName: "Pending Activation Partners",
      routerName: "Root.Dashboard.RequestedPartnerList",
    })
    .addTab({
      tabName: "FPP Client File List",
      routerName: "Root.Dashboard.FPPClientList",
    })
    
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
}
