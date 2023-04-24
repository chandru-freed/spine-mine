<template>
  <a @click="onClick(modelValue)">
  <v-icon small color="primary" v-if="!!icon">{{icon}}</v-icon>
    {{linkText?linkText:selectModel(modelValue,dataSelectorKey)}}
    
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
  linkText: string;

  @Prop()
  icon: string;

  @Prop()
  dataSelectorKey: string;
}
</script>
