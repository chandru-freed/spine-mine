<template>
  <span class="grey--text">
    {{ selectModel(modelValue, dataSelectorKey) | std-date-time }} 
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FCellStandardDateTime extends ModelVue {
  @Prop()
  dataSelectorKey: string;
}
</script>
