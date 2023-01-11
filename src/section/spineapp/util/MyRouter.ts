import VueRouter, { Route } from "vue-router";

export default class MyRouter {
  static gotoFile({router, clientFileNumber}: {router: VueRouter, clientFileNumber: string}) {
    router.push({
      name: "Root.CFFileRedirect",
      params: { clientFileNumber: clientFileNumber },
    });
  }

  static gotoClientFile({router, clientFileId}: {router: VueRouter, clientFileId: string}) {
    router.push({
      name: "Root.CFile.CFInfo.CFPersonalInfo",
      params: { clientFileId: clientFileId },
    });
  }

  static gotoCFActiveTaskList({router, clientFileId}: {router: VueRouter, clientFileId: string}) {
    router.push({
      name: "Root.CFile.CFTask.CFActiveTasks",
      params: { clientFileId: clientFileId},
    });
  }

  static gotoCFTask({router, clientFileId, taskId}: {router: VueRouter, clientFileId: string, taskId: string}) {
    router.push({
      name: "Root.CFile.CFInfo.CFPersonalInfo",
      params: { clientFileId: clientFileId, taskId: taskId},
    });
  }

  static gotoClient({router, clientId}: {router: VueRouter, clientId: string}) {
    router.push({
      name: "Root.Client.ClientDetails",
      params: { clientId: clientId },
    });
  }

  static gotoStep({router, clientFileNumber,step,route}: {router: VueRouter, clientFileNumber: string, step: any,route: Route}) {
    router.push({
      name: "Root.ClientFile.FileTask.FileTaskDetails",
      params: { clientFileNumber: clientFileNumber },
      query:{ ...route.query,step },
    });
  }
}
