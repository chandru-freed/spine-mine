<template>
  <div>
   <span class="caption mr-2">  {{selectModel(modelValue,dataSelectorKey)||'--'}}</span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FCellEmail extends ModelVue {
  @Prop()
  dataSelectorKey: string;

}
</script>
