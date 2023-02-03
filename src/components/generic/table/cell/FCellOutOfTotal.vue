<template>
  <span :class="`${textColor}--text`">
    {{`${selectModel(modelValue, valueDataSelectorKey)} / ${selectModel(modelValue, totalDataSelectorKey)}`}}
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FCellOutOfTotal extends ModelVue {
  @Prop()
  valueDataSelectorKey: string;

  @Prop()
  totalDataSelectorKey: string;

  
  get textColor(): string {
    return this.selectModel(this.modelValue, this.valueDataSelectorKey) === this.selectModel(this.modelValue, this.totalDataSelectorKey)?
    "green"
    :"orange"
  } 
}
</script>
