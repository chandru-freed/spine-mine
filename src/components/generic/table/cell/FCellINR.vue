<template>
  <div >
    {{selectModel(modelValue,dataSelectorKey)| toINR}}
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {
  },
})
export default class FCellINR extends ModelVue {
 @Prop() 
 dataSelectorKey: string;
}
</script>
