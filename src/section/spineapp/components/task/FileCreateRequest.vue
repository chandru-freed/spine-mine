<template>
  <!-- TASK TAB -->
  <div>
    <v-btn @click="backButtonPressed" text icon color="lighten-2" class="ma-2">
      <v-icon size="40">mdi-chevron-left</v-icon>
    </v-btn>
    <div class="d-flex justify-center">
      <v-card
        class="pa-0 ma-0 mt-5 col-6"
        color="white"
        outlined
        min-height="300px"
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
  </div>
  <!--  TASK TAB -->
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";

import FForm from "@/components/generic/form/FForm.vue";
import EnrollmentFFormMDP from "./createRequestForm/EnrollmentFFormMDP";
import Helper from "../../util/Helper";
import CHPPFFormMDP from "./createRequestForm/CHPPFFormMDP";
import NsfMSFFFormMDP from "./createRequestForm/NsfMSFFFormMDP";
import WelcomeCallFFormMDP from "./createRequestForm/WelcomeCallFFormMDP";
import MFCFFormMDP from "./createRequestForm/MFCFFormMDP";
import NsfSPAFFormMDP from "./createRequestForm/NsfSPAFFormMDP";

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
    {
      key: "CHPP",
      contentMetaData: new CHPPFFormMDP({
        taskRoot: this,
        parent: this,
      }).getMetaData(),
    },
    {
      key: "NsfMSF",
      contentMetaData: new NsfMSFFFormMDP({
        taskRoot: this,
        parent: this,
      }).getMetaData(),
    },
    {
      key: "Welcome Call",
      contentMetaData: new WelcomeCallFFormMDP({
        taskRoot: this,
        parent: this,
      }).getMetaData(),
    },
    {
      key: "MFC",
      contentMetaData: new MFCFFormMDP({
        taskRoot: this,
        parent: this,
      }).getMetaData(),
    },
    {
      key: "NsfSPA",
      contentMetaData: new NsfSPAFFormMDP({
        taskRoot: this,
        parent: this,
      }).getMetaData(),
    },
  ];

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
        setTimeout(() => {
          this.$emit("flowCreated");
        }, 400);
      }
    );
  }

  createCHPPFlow() {
    Action.Spine.CreateCHPP.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {
        setTimeout(() => {
          this.$emit("flowCreated");
        }, 400);
      }
    );
  }

  createNsfMSFFlow() {
    Action.Spine.CreateNsfMSF.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {
        setTimeout(() => {
          this.$emit("flowCreated");
        }, 400);
      }
    );
  }

  createWelcomeCall() {
    Action.Spine.CreateWelcomeCall.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {
        setTimeout(() => {
          this.$emit("flowCreated");
        }, 400);
      }
    );
  }

  createMFC() {
    Action.Spine.CreateMFC.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {
        setTimeout(() => {
          this.$emit("flowCreated");
        }, 400);
      }
    );
  }
  createNsfSPA() {
    Action.Spine.CreateNsfSPA.execute1(
      this.clientFileBasicInfo.clientFileId,
      (output) => {
        setTimeout(() => {
          this.$emit("flowCreated");
        }, 400);
      }
    );
  }

  gotoFile(clientFileNumber: string) {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: clientFileNumber,
    });
  }

  backButtonPressed() {
    this.$emit("backButtonPressed");
  }
}
</script>

<style>
.v-btn {
  text-transform: unset !important;
}
</style>
