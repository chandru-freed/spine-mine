import ModelVue from "@/components/generic/ModelVue";
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";

import * as Action from "@/../src-gen/action";

import VueRouter from "vue-router";
import Helper from "./Helper";

export default class FlowAction {
  static createFlow({
    createRequestFormData,
    clientFileNumber,
    router,
  }: {
    createRequestFormData: any;
    clientFileNumber: string;
    router: VueRouter;
  }) {
    console.log("createFlow is being called");
    const input = ServerData.FlowWebWriter.Create$Input.fromJson(
      createRequestFormData
    );
    Action.Spine.Create.execute(
      input,
      (output) => {
        Helper.Router.gotoFile({
          router,
          clientFileNumber,
        });
      }
    );
  }
}
