import VueRouter from "vue-router";

export default class MyRouter {
  static gotoFile({router, fileId}: {router: VueRouter, fileId: string}) {
    router.push({
      name: "Root.ClientFile.ClientFileDetails",
      params: { fileId: fileId },
    });
  }

  static gotoClient({router, clientId}: {router: VueRouter, clientId: string}) {
    router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }
}
