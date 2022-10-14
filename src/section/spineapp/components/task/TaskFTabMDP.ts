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
    // TODO: We have to discuss
    // .addTab({
    //   tabName: "Pinned",
    //   routerName: "Root.TaskList.TaskPinned",
    // }).addTab({
    //   tabName: "Deferred",
    //   routerName: "Root.TaskList.TaskDeferred",
    // })
    .addTab({
      tabName: "Completed",
      routerName: "Root.TaskList.TaskCompleted",
    })
    // .addTab({
    //   tabName: "My Ticket",
    //   routerName: "Root.TaskList.TicketAssignedToMe",
    // });
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
}
