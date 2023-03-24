<template>
  <a  @click="copyToClipBoard()">
    <v-icon small>mdi-content-copy</v-icon>
  </a>
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
  copyToClipBoard() {
    Helper.copyToClipBoard(this.modelValue);
  }
}
</script>
