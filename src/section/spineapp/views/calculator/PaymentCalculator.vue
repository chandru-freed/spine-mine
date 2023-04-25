<template>
<v-card flat>
<v-container>
  <v-card outlined flat class="PaymentCalculator">
    <component
      :ref="calculateAndRegisterClientFileMetaData.myRefName"
      :is="calculateAndRegisterClientFileMetaData.componentName"
      v-bind="calculateAndRegisterClientFileMetaData.props"
    ></component>
  </v-card>
</v-container>
</v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import store, * as Store from "@/../src-gen/store";
import * as Data from "@/../src-gen/data";
import * as ServerData from "@/../src-gen/server-data";
import * as Action from "@/../src-gen/action";
import TMOStimulator from "@/components/generic/tmoStimulator/TMOStimulator.vue";
import TMOSSimulatorEditable from "@/components/generic/tmoStimulator/TMOSSimulatorEditable.vue";
import RegisterMyCFFFormMDP from "../myfiles/RegisterMyCFFFormMDP";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import Helper from "../../util/Helper";
import CalculateAndRegisterClientFile from "@/components/generic/file/calculateAndRegister/CalculateAndRegisterClientFile.vue";
import CalculateAndRegisterClientFileMDP from "@/components/generic/file/calculateAndRegister/CalculateAndRegisterClientFileMDP";


@Component({
  components: {
    TMOSSimulatorEditable,
    FForm,
    CalculateAndRegisterClientFile
  },
})
export default class PaymentCalculator extends ModelVue {
  
  get calculateAndRegisterClientFileMetaData() {
    return new CalculateAndRegisterClientFileMDP({
      root: this
    }).getMetaData();
  }

  
}
</script>

<style>
</style>
