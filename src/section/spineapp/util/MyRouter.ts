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
}
