<template>
  <div>
    <v-card flat outlined>
      <v-toolbar color="grey lighten-2" flat>
        <v-toolbar-title>Request Type</v-toolbar-title>
        <v-autocomplete
          v-model="selectedRequestType"
          :items="requestTypeFlowMapList"
          cache-items
          class="mx-4"
          flat
          hide-no-data
          hide-details
          label="Select Request Type"
          solo
          item-value="value"
          item-text="key"
        ></v-autocomplete>
      </v-toolbar>
      <v-card-text >
        <component
          v-if="!!initMetaData"
          :ref="initMetaData.myRefName"
          :is="initMetaData.componentName"
          v-model="initDocumentData"
          v-bind="initMetaData.props"
        ></component>
      </v-card-text>
    </v-card>
  </div>
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
import Flow from "@/section/spineapp/util/Flow"

@Component({
  components: {
    EnrollmentFFormMDP,
    FForm,
  },
})
export default class CreateRequest extends Vue {
  selectedRequestType: any = {};
  requestTypeFlowMapList = [
    {
      key: "Enrollment",
      value: {
        fqFlowName: "DspFlow::Enrollment",
        netName: "Default",
        priority: 1,
        teamCode: "enrollment",
      },
    },

    {
      key: "CHPP",
      value: {
        fqFlowName: "DspFlow::CHPP",
        netName: "Default",
        priority: 1,
        teamCode: "chpp",
      },
    },

    {
      key: "NsfMSF",
      value: {
        fqFlowName: "DspFlow::NsfMSF",
        netName: "Default",
        priority: 1,
        teamCode: "nsfmsf",
      },
    },
  ];

  initDocumentData: any = {}
  get createRequestFormData() {
    return {...this.selectedRequestType, initDocument: JSON.stringify(this.initDocumentData)}
  }
  

  get initFormMetaDataList(): any {
    return {
      "DspFlow::Enrollment:Default": new EnrollmentFFormMDP({
        taskRoot: this,
        parent: this,
      }).getMetaData(),

      "DspFlow::CHPP:Default": new EnrollmentFFormMDP({
        taskRoot: this,
        parent: this,
      }).getMetaData(),

      "DspFlow::NsfMSF:Default": new NsfMSFFFormMDP({
        taskRoot: this,
        parent: this,
      }).getMetaData(),
    };
  }

  get initMetaData(): any {
    const fqFlowNameNet = `${this.selectedRequestType.fqFlowName}:${this.selectedRequestType.netName}`
    return this.initFormMetaDataList[fqFlowNameNet]
  }

  createFlow() {
    Flow.Action.createFlow({
      createRequestFormData: this.createRequestFormData,
      fileId: this.initDocumentData.fileId,
      router:this.$router
    });
 
  }

  gotoFile(fileId: string) {
    this.$router.push({
      name: "Root.ClientFile.ClientFileDetails",
      params: { fileId: fileId },
    });
  }
}
</script>