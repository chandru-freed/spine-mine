<template>
  <a @click="onClick(modelValue)">
    {{selectModel(modelValue,dataSelectorKey)}}
  </a>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {
  },
})
export default class FCellLink extends ModelVue {
 
  @Prop()
  onClick: (item: any) => void;
  
  @Prop()
  dataSelectorKey: string;
}
</script>
