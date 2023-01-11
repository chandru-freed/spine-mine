<template>
  <v-btn text :color="color">
    <v-icon :color="color" v-if="icon" dense small class="mr-1">
      {{ icon }}
    </v-icon>
    <span class="overline">
      {{ selectModel(modelValue, dataSelectorKey) }}
    </span>
  </v-btn>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FCellName extends ModelVue {
  @Prop()
  onClick: (item: any) => void;

  @Prop({
    default: "deep-purple",
  })
  color: string;

  @Prop({
    default: "mdi-account",
  })
  icon: string;

  @Prop()
  dataSelectorKey: string;

}
</script>
