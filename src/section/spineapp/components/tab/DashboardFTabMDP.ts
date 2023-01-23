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
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
}
