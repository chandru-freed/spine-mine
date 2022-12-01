
<template>
  <span >
    {{selectModel(modelValue,dataSelectorKey) | date}}
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {
  },
})
export default class FCellDate extends ModelVue {
  @Prop()
  dataSelectorKey: () => void;
}
</script>
