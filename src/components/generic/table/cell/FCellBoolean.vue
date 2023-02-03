<template>
    <span :class="`${textColor}--text`">
    {{ selectModel(modelValue, dataSelectorKey)?'Yes':'No' }}
    </span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FCellBoolean extends ModelVue {


  @Prop()
  dataSelectorKey: string;
  
  get textColor(): string {
    return this.selectModel(this.modelValue, this.dataSelectorKey)?"green":"orange"
  }
}
</script>
