<template>
  <v-btn
    x-small
    outlined
    :class="`${color}--text`"
    @click="onClick(modelValue)"
  >
     Preview 
  </v-btn>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FCellBtnPreview extends ModelVue {
  @Prop()
  onClick: (item: any) => void;

  @Prop({
    default: "green",
  })
  color: string;

  @Prop()
  icon: string;

  @Prop()
  dataSelectorKey: string;
}
</script>
