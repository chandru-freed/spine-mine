<template>
  <v-chip :outlined="outlined" v-if="selectModel(modelValue,dataSelectorKey)" small :color="getColor()">
    {{selectModel(modelValue,dataSelectorKey)}}
  </v-chip>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";
import * as Data from "@/../src-gen/data";

@Component({
  components: {
  },
})
export default class FCellStatus extends ModelVue {
  @Prop()
  dataSelectorKey: string;

  @Prop({default: false})
  outlined: boolean

  @Prop({})
  colorCodeData: any;

  getColor() {
    const selectedStatus = this.selectModel(this.modelValue,this.dataSelectorKey);
    try {
    return this.colorCodeData.withId(selectedStatus)?.name || "purple";
    } catch(e) {
      return "default"
    }
  }
}
</script>
