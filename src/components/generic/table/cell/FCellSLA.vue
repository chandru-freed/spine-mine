
<template>
  <span :class="[slaStatus ? 'grey--text' : 'red--text']" v-if="modelValue.sla">
    {{ selectModel(modelValue, dataSelectorKey) | date }}
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";
import moment from "moment";

@Component({
  components: {},
})
export default class FCellSLA extends ModelVue {
  @Prop()
  dataSelectorKey: string;

  get slaStatus() {
    const diff = moment(new Date(this.modelValue.sla)).diff(moment());
    return diff > 0;
  }
}
</script>
