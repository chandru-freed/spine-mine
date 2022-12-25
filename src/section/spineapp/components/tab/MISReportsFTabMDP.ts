import FTabMDP from "@/components/generic/FTabMDP";

export default class MISReportsFTabMDP extends FTabMDP {
  taskRoot: any;

  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "misreportsFTabMDPRef",
    });
    this.taskRoot = taskRoot;

    this.addTab({
      tabName: "Payments",
      routerName: "Root.TaskList.TaskAssignedToMe",
    }).addTab({
      tabName: "Accounts",
      routerName: "Root.TaskList.TaskPool",
    });
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
}
