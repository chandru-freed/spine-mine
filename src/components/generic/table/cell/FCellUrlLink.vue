<template>
<span>
  <a class="mr-1" v-if="selectModel(modelValue,dataSelectorKey)" :href="selectModel(modelValue,dataSelectorKey)">
    {{placeholder}}
  </a>
  <div v-else>--</div>
</span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {
  },
})
export default class FCellUrlLink extends ModelVue {
 @Prop({
  default: "Url"
 })
 placeholder: string;
  
  @Prop()
  dataSelectorKey: string;

  openLink() {}
}
</script>
