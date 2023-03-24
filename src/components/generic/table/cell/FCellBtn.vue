<template>
  <a text :class="`${color}--text`" @click="onClick(modelValue)">
    <v-icon :color="color" v-if="icon" dense small class="mr-1"> {{icon}} </v-icon>
    <span class="overline">
    {{ selectModel(modelValue, dataSelectorKey) }}
    </span>
  </a>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FColumnBtn extends ModelVue {
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
