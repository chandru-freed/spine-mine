<template>
<span >
    <span v-for="(item,index) of selectModel(modelValue, dataSelectorKey)" :class="`${textColor}--text`" :key="index">
    <v-icon v-if="item==true" color="green">mdi-check-circle</v-icon>
    <v-icon v-else color="red">mdi-close-circle</v-icon>
    
    </span>
    </span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FCellBooleanList extends ModelVue {


  @Prop()
  dataSelectorKey: string;
  
  get textColor(): string {
    return this.selectModel(this.modelValue, this.dataSelectorKey)?"green":"orange"
  }
}
</script>
