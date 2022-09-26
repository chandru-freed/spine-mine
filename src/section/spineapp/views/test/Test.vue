<template>
  <div>
    <v-card flat outlined>
      <v-card-title>Register Client</v-card-title>
      <v-card-text>
        <component
          v-if="!!testFormMetaData"
          :ref="testFormMetaData.myRefName"
          :is="testFormMetaData.componentName"
          v-model="registerClientFormData"
          v-bind="testFormMetaData.props"
        ></component>
      </v-card-text>
    </v-card>
  </div>
</template>
  
  <script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
import * as Data from "@/../src-gen/data";
// import * as ServerData from '@/../src-gen/server-data';
// import * as Action from '@/../src-gen/action';
import FForm from "@/components/generic/form/FForm.vue";
import TestFormMDP from "./TestFFromMDP";
import Flow from "@/section/spineapp/util/Flow";
import TestIntl from "./TestIntf";
import Helper from "../../util/Helper";

@Component({
  components: {
    FForm,
  },
})
export default class Dashboard extends Vue implements TestIntl {
  registerClientFormData: Data.Client.RegisterClientForm =
    new Data.Client.RegisterClientForm();

  get testFormMetaData(): any {
    return new TestFormMDP({ root: this }).getMetaData();
  }
}
</script>
  
  <style>
</style>
  