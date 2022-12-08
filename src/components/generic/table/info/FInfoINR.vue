<template>
  <v-chip label outlined color="primary">
    {{label}} - {{inrValue | toINR}}
  </v-chip>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {
  },
})
export default class FInfoINR extends ModelVue {
 @Prop()
 label: string;

 get inrValue() {
  return this.value? this.value: 0
 }
}
</script>
