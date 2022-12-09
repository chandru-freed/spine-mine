
<template>
  <span class="grey--text">
    {{selectModel(modelValue,dataSelectorKey) | date}}
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {
  },
})
export default class FCellDayPastDue extends ModelVue {
  @Prop()
  dataSelectorKey: string;
}
</script>
