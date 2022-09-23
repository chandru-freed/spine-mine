import VueRouter from "vue-router";

export default class MyRouter {
  static gotoFile({router, clientFileNumber}: {router: VueRouter, clientFileNumber: string}) {
    router.push({
      name: "Root.ClientFile.ClientFileDetails",
      params: { clientFileNumber: clientFileNumber },
    });
  }

  static gotoClient({router, clientId}: {router: VueRouter, clientId: string}) {
    router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }

  static gotoStep({router, clientFileNumber,step}: {router: VueRouter, clientFileNumber: string, step: any}) {
    router.push({
      name: "Root.ClientFile.FileTask.FileTaskDetails",
      params: { clientFileNumber: clientFileNumber },
      query:{ step },
    });
  }
}
