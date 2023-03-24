import FTabMDP from "@/components/generic/FTabMDP";

export default class CFPaymentPlanFTabMDP extends FTabMDP {
  taskRoot: any;

  constructor({ taskRoot }: { taskRoot: any }) {
    super({
      myRefName: "cfPaymentPlanFTabRef",
    });
    this.taskRoot = taskRoot;


    this.addTab({
      tabName: "PAYMENT SCHEDULE",
      routerName: "Root.CFile.CFInfo.CFPaymentPlanInfo",
    }).addTab({
      tabName: "MSF SCHEDULE",
      routerName: "Root.CFile.CFInfo.CFPaymentPlanMSFInfo",
    })
    
  }

  getMyRef(): any {
    return this.taskRoot.$refs[this.myRefName];
  }
}
