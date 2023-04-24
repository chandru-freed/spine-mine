<template>
<div>
  <a v-if="selectModel(modelValue,dataSelectorKey)" :href="selectModel(modelValue,dataSelectorKey)">
    Url
  </a>
  <div v-else>--</div>
</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {
  },
})
export default class FCellUrlLink extends ModelVue {
 
  
  @Prop()
  dataSelectorKey: string;

  openLink() {}
}
</script>
