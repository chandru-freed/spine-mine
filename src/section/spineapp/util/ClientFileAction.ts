import ModelVue from "@/components/generic/ModelVue";
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";

import * as Action from "@/../src-gen/action";

import VueRouter from "vue-router";
import Helper from "./Helper";

export default class ClientFileAction {
  static uploadDocumentToFile({
    uploadDocumentInput, callback
  }: {
    uploadDocumentInput: Data.ClientFile.UploadDocumentForm,
    callback: () => void
  }) {
    Action.ClientFile.UploadDocument.execute(
      uploadDocumentInput,
      (output) => {
        callback()
      }
    );
  }
}
