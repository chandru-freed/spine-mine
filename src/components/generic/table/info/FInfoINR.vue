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

 @Prop()
 rounded: boolean;

 get inrValue() {
  return this.rounded? Math.round(this.value): this.value
 }
}
</script>
