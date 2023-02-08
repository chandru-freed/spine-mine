<template>
<span >
    <span v-for="(item,index) of selectModel(modelValue, dataSelectorKey)" :key="index">
    {{item[itemDataSelectorKey]}}  {{index ==(selectModel(modelValue, dataSelectorKey).length -1)?'':','}}
    
    </span>
    </span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FCellList extends ModelVue {


  @Prop()
  dataSelectorKey: string;
  
  @Prop()
  itemDataSelectorKey: string;
  get textColor(): string {
    return this.selectModel(this.modelValue, this.dataSelectorKey)?"green":"orange"
  }
}
</script>
