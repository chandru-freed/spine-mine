<template>
  <v-card flat>
    <!-- <div class="row">
      <div class="col-12">
        {{selectedComponent}}
      </div>
    </div> -->
    <v-card-actions class="pb-0">
      <v-btn text @click="gotoFile">
        <v-icon>mdi-chevron-left</v-icon> All Tasks</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn
        outlined
        color="primary"
        @click="startTask"
        v-if="taskDetails.taskState === 'ALLOCATED'"
        >START</v-btn
      >

      <v-btn
        outlined
        color="primary"
        @click="pullTask"
        v-if="taskDetails.taskState === 'TO_BE_PULLED'"
        >PULL</v-btn
      >
    </v-card-actions>
    <v-card-text class="pa-0">
      <component
        v-if="!loading"
        :is="selectedComponent"
      ></component>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";

import CollectClientInfoTask from "@/section/spineapp/components/task/enrollment/collectClientInfo/CollectClientInfoTask.vue";
import UnderwrittingTask from "@/section/spineapp/components/task/enrollment/underwritting/UnderwrittingTask.vue";
import ClientInfoVerificationTask from "@/section/spineapp/components/task/enrollment/clientInfoVerification/ClientInfoVerificationTask.vue"
import EMandateFailedTask from "@/section/spineapp/components/task/enrollment/eMandateFailed/EMandateFailedTask.vue";
import SignServiceAgreementFailedTask from "@/section/spineapp/components/task/enrollment/signServiceAgreementFailed/SignServiceAgreementFailedTask.vue";
import EnrollmentCompletionTask from "@/section/spineapp/components/task/enrollment/enrollmentCompletion/EnrollmentCompletionTask.vue"
import DownloadUnSignedDocTask from "@/section/spineapp/components/task/digio/downloadUnSignedDoc/DownloadUnSignedDocTask.vue"
import GenerateSSADocTask from "@/section/spineapp/components/task/digio/generateSSADoc/GenerateSSADocTask.vue";
import UpdateClientSignStatusTask from "@/section/spineapp/components/task/digio/updateClientSignStatus/UpdateClientSignStatusTask.vue";
import UploadUnSignedDocTask from "@/section/spineapp/components/task/digio/uploadUnSignedDoc/UploadUnSignedDocTask.vue";
import * as RemoteApiPoint from "@/remote-api-point";
import WaitForClientSignTask from "@/section/spineapp/components/task/digio/waitForClientSign/WaitForClientSignTask.vue"
import UploadClientSignedDocTask from "@/section/spineapp/components/task/digio/uploadClientSignedDoc/UploadClientSignedDocTask.vue"
import SignByFreedTask from "@/section/spineapp/components/task/digio/signByFreed/SignByFreedTask.vue";
import DownloadClientSignDocTask from "./digio/downloadClientSignDoc/DownloadClientSignDocTask.vue";
import UploadFreedSignedDocTask from "./digio/uploadFreedSignedDoc/UploadFreedSignedDocTask.vue";
import ClientSignExpiredTask from "./digio/clientSignExpired/ClientSignExpiredTask.vue";
import CreateEMandateTask from "./eMandate/createEMandate/CreateEMandateTask.vue";
import Helper from "../../util/Helper";
@Component({
  components: {
    CollectClientInfoTask,
    UnderwrittingTask,
    ClientInfoVerificationTask,
    EMandateFailedTask,
    SignServiceAgreementFailedTask,
    EnrollmentCompletionTask,
    DownloadUnSignedDocTask,
    GenerateSSADocTask,
    UpdateClientSignStatusTask,
    WaitForClientSignTask,
    DownloadClientSignDocTask,
    UploadFreedSignedDocTask,
    UploadClientSignedDocTask,
    SignByFreedTask,
    ClientSignExpiredTask,
    CreateEMandateTask,
    UploadUnSignedDocTask,
  },
})
export default class FileTaskArea extends Vue {
  @Store.Getter.Login.LoginDetails.userName userName: string;

  @Store.Getter.TaskList.Summary.executiveTaskDetails
  taskDetails: Data.TaskList.ExecutiveTaskDetails;

  loading = true


  TASK_COMPONENT_MAP = new Map([
    ["CollectClientInfo", "CollectClientInfoTask"],
    ["SignServiceAgreementFailed", "SignServiceAgreementFailedTask"],
    ["ClientInfoVerification", "ClientInfoVerificationTask"],
    ["Underwritting", "UnderwrittingTask"],
    ["EnrollmentCompletion", "EnrollmentCompletionTask"],
    ["EMandateFailed", "EMandateFailedTask"],
    ["DownloadUnSignedDoc", "DownloadUnSignedDocTask"],
    ["GenerateSSADoc", "GenerateSSADocTask"],
    ["UpdateClientSignStatus", "UpdateClientSignStatusTask"],
    ["WaitForClientSign", "WaitForClientSignTask"],
    ["DownloadClientSignDoc", "DownloadClientSignDocTask"],
    ["UploadFreedSignedDoc", "UploadFreedSignedDocTask"],
    ["UploadClientSignedDoc", "UploadClientSignedDocTask"],
    ["SignByFreed", "SignByFreedTask"],
    ["ClientSignExpired", "ClientSignExpiredTask"],
    ["CreateEMandate", "CreateEMandateTask"],
    ["UploadUnSignedDoc", "UploadUnSignedDocTask"],
  ]);

  taskId = this.$route.params.taskId;

  get selectedComponent() {

    return this.TASK_COMPONENT_MAP.get(this.taskDetails.taskName);
  }

  get taskFormDisabled() {
    return !(
      this.taskDetails.taskState === "STARTED" ||
      this.taskDetails.taskState === "PARTIALLY_COMPLETED"
    );
  }

  public getExecutiveTaskDetailsHandler = (output: string) =>
    this.getExecutiveTaskDetailsWithDelay();

  public mounted() {
    Action.TaskList.PullTask.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Start.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Save.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Complete.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.SaveAndComplete.interested(
      this.getExecutiveTaskDetailsHandler
    );
    Action.TaskList.Suspend.interested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Resume.interested(this.getExecutiveTaskDetailsHandler);

    

    this.getExecutiveTaskDetailsWithDelay();
  }


  getExecutiveTaskDetailsWithDelay() {
    setTimeout(
    this.getExecutiveTaskDetails, 1000)
  }

  getExecutiveTaskDetails() {
    Action.TaskList.GetExecutiveTaskDetails.execute1(
      this.$route.params.taskId,
      (output) => {
        // console.log(output);
        this.loading = false
      },
      (err) => {
        // console.error(err);
      },
      RemoteApiPoint.BenchApi
    )
  }

  startTask() {
    Action.TaskList.Start.execute1(
      this.$route.params.taskId,
      (output) => {
        console.log("");
      },
      (err) => {
        // console.error(err);
      },
      RemoteApiPoint.BenchApi
    );
  }

  pullTask() {
    Action.TaskList.PullTask.execute2(
      this.$route.params.taskId,
      this.userName,
      (output) => {
        // this.gotoTask(item);
      },
      (err) => {
        // console.error(err);
      },
      RemoteApiPoint.BenchApi
    );
  }

  gotoFile() {
    Helper.Router.gotoFile({
      router: this.$router,
      fileId: this.$route.params.fileId,
    });
  }

  gotoTask(item: any) {
    const params = { ...this.$route.params, taskId: item.taskId };
    // console.log(" gotoTask ------------------ ");
    // console.log(params);
    this.$router.push({
      name: "Root.ClientFile.FileTask.FileTaskDetails",
      params: params,
    });
  }

  public destroyed() {
    Action.TaskList.PullTask.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Start.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Save.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Complete.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.SaveAndComplete.notInterested(
      this.getExecutiveTaskDetailsHandler
    );
    Action.TaskList.Suspend.notInterested(this.getExecutiveTaskDetailsHandler);
    Action.TaskList.Resume.notInterested(this.getExecutiveTaskDetailsHandler);
  }
}
</script>

<style></style>
