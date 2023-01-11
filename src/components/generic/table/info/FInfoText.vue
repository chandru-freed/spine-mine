<template>
  <v-chip label outlined color="primary">
    {{label}} - {{value}}
  </v-chip>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {
  },
})
export default class FInfoText extends ModelVue {
 @Prop()
 label: string;
}
</script>
