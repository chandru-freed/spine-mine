import VueRouter from "vue-router";

export default class MyRouter {
  static gotoFile({router, fileId}: {router: VueRouter, fileId: string}) {
    router.push({
      name: "Root.ClientFile.ClientFileDetails",
      params: { fileId: fileId },
    });
  }
}
