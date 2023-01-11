import FTabMDP from "@/components/generic/FTabMDP";

export default class SearchLayoutFTabMDP extends FTabMDP {
  taskRoot: any;

  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "searchLayoutFTabRef",
    });
    this.taskRoot = taskRoot;


    this.addTab({
      tabName: "Client",
      routerName: "Root.Search.ClientSearch"
    }).addTab({
      tabName: "File",
      routerName: "Root.Search.ClientFileSearch"
    }).addTab({
      tabName: "UnAssigned File",
      routerName: "Root.Search.UnAssignedCFSearch"
    });
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
}
