<template>
<v-tooltip bottom max-width="300">
      <template v-slot:activator="{ on, attrs }">
        <a :class="boundaryClass" v-bind="attrs" v-on="on" @click="copyToClipBoard()">
          <v-icon small>mdi-content-copy</v-icon>
        </a>
      </template>
      <span>{{ tooltipText }}</span>
</v-tooltip>
</template>
<script lang="ts">
import Helper from "@/section/spineapp/util/Helper";
import { Component, Prop } from "vue-property-decorator";
import { VBtn } from "vuetify/lib/components";
import ModelVue from "./ModelVue";

@Component({
  components: {},
})
export default class FCopy extends ModelVue {
  @Prop({default:"Copy"})
  tooltipText: string;
  @Prop({default:""})
  boundaryClass: string;
  
  copyToClipBoard() {
    Helper.copyToClipBoard(this.modelValue);
  }
}
</script>
