<template>
  <!-- TASK TAB -->
  <div>
    <v-navigation-drawer
      absolute
      permanent
      right
      :width="rightFocused ? '100%' : '49%'"
      v-if="!leftFocused"
    >
  <div>
    <div class="d-flex justify-end">
        <v-btn @click="gotoClientFile" text icon color="lighten-2" class="ma-2">
          <v-icon size="20">mdi-close</v-icon>
        </v-btn>
      </div>
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
            dense
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
    </v-navigation-drawer>
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
import EnrollmentFFormMDP from "@/section/spineapp/components/task/createRequestForm/EnrollmentFFormMDP";
import Helper from "../../util/Helper";
import CHPPFFormMDP from "@/section/spineapp/components/task/createRequestForm/CHPPFFormMDP";
import NsfMSFFFormMDP from "@/section/spineapp/components/task/createRequestForm/NsfMSFFFormMDP";
import WelcomeCallFFormMDP from "@/section/spineapp/components/task/createRequestForm/WelcomeCallFFormMDP";
import MFCFFormMDP from "@/section/spineapp/components/task/createRequestForm/MFCFFormMDP";
import NsfSPAFFormMDP from "@/section/spineapp/components/task/createRequestForm/NsfSPAFFormMDP";

@Component({
  components: {
    EnrollmentFFormMDP,
    FForm,
  },
})
export default class FileCreateRequest extends Vue {
clientFileNumber = this.$route.params.clientFileNumber;
  @Store.Getter.ClientFile.ClientFileSummary.clientFileBasicInfo
  clientFileBasicInfo: Data.ClientFile.ClientFileBasicInfo;

  leftFocused = false;
  rightFocused = true;

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
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.gotoClientFile();
        }, 400);
      }
    );
  }

  createCHPPFlow() {
    Action.Spine.CreateCHPP.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.gotoClientFile();
        }, 400);
      }
    );
  }

  createNsfMSFFlow() {
    Action.Spine.CreateNsfMSF.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.gotoClientFile();
        }, 400);
      }
    );
  }

  createWelcomeCall() {
    Action.Spine.CreateWelcomeCall.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.gotoClientFile();
        }, 400);
      }
    );
  }

  createMFC() {
    Action.Spine.CreateMFC.execute1(
      this.clientFileBasicInfo.clientFileNumber,
      (output) => {
        setTimeout(() => {
          this.gotoClientFile();
        }, 400);
      }
    );
  }
  createNsfSPA() {
    Action.Spine.CreateNsfSPA.execute1(
      this.clientFileBasicInfo.clientFileNumber,
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


   gotoClientFile() {
    Helper.Router.gotoFile({
      router: this.$router,
      clientFileNumber: this.clientFileNumber,
    });
  }
}
</script>

<style>
.v-btn {
  text-transform: unset !important;
}
</style>
