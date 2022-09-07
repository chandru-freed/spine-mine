<template>
  <!-- TASK TAB -->
  <div class="d-flex justify-center">
    <v-card
      class="pa-0 ma-0 mt-5 col-6"
      color="white"
      outlined
      min-height="700px"
    >
      <v-card-text>
        <v-autocomplete
          v-model="selectedRequestType"
          :items="requestTypeFlowMapList"
          cache-items
          flat
          hide-no-data
          hide-details
          label="Select Request Type"
          outlined
          item-value="contentMetaData"
          item-text="key"
        ></v-autocomplete>
      </v-card-text>

      <v-card-text>
        <component
          v-if="!!selectedRequestType"
          :ref="selectedRequestType.myRefName"
          :is="selectedRequestType.componentName"
          v-model="initDocumentData"
          v-bind="selectedRequestType.props"
        ></component>
      </v-card-text>
    </v-card>
  </div>
  <!--  TASK TAB -->
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import * as RemoteApiPoint from "@/remote-api-point";
import FForm from "@/components/generic/form/FForm.vue";
import EnrollmentFFormMDP from "./EnrollmentFFormMDP";
import NsfMSFFFormMDP from "./NsfMSFFFormMDP";
import Flow from "@/section/spineapp/util/Flow";
import WelcomeCallFFormMDP from "./WelcomeCallFFormMDP";

@Component({
  components: {
    EnrollmentFFormMDP,
    FForm,
  },
})
export default class FileCreateRequest extends Vue {
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  selectedRequestType: any = {};
  requestTypeFlowMapList = [
    {
      key: "Enrollment",
      contentMetaData: new EnrollmentFFormMDP({
        taskRoot: this,
        parent: this,
      }).getMetaData(),
    },
  ];
  fileId = this.$route.params.fileId;

  get initDocumentData() {
    return {
      clientFileNumber: this.clientFileBasicInfo.clientFileNumber,
    };
  }
  get createRequestFormData() {
    return {
      ...this.selectedRequestType,
      initDocument: JSON.stringify(this.initDocumentData),
    };
  }

  createEnrollmentFlow() {
    Action.Spine.CreateEnrollment.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {
        console.log("");
      },
      (err) => {
        // console.error(err);
      },
      RemoteApiPoint.DspApi
    );
  }

  gotoFile(fileId: string) {
    this.$router.push({
      name: "Root.ClientFile.ClientFileDetails",
      params: { fileId: fileId },
    });
  }
}
</script>

<style>
.v-btn {
  text-transform: unset !important;
}
</style>
