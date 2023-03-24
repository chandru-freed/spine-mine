<template>
  <span >
    {{selectModel(modelValue,dataSelectorKey)||'--'}}
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {
  },
})
export default class FColumnText extends ModelVue {
 
}
</script>
