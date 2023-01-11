import FTabMDP from "@/components/generic/FTabMDP";

export default class TaskFTabMDP extends FTabMDP {
  taskRoot: any;

  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "taskFTabMDPRef",
    });
    this.taskRoot = taskRoot;


    this.addTab({
      tabName: "My Task",
      routerName: "Root.TaskList.TaskAssignedToMe",
    }).addTab({
      tabName: "Pool",
      routerName: "Root.TaskList.TaskPool",
    })
    .addTab({
      tabName: "Completed",
      routerName: "Root.TaskList.TaskCompleted",
    })
    .addTab({
      tabName: "Suspended",
      routerName: "Root.TaskList.TaskSuspended",
    })
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
}
