<template>
  <v-hover>
    <template v-slot="{ hover }">
      <div class="d-flex align-center">
        <slot> </slot>
        <a class="mx-3" v-if="hover" @click="copyToClipBoard()">
          <v-icon small>mdi-content-copy</v-icon>
        </a>
      </div>
    </template>
  </v-hover>
</template>
<script lang="ts">
import Helper from "@/section/spineapp/util/Helper";
import { Component, Prop } from "vue-property-decorator";
import { VBtn } from "vuetify/lib/components";
import ModelVue from "./ModelVue";

@Component({
  components: {},
})
export default class FHoverCopy extends ModelVue {
  copyToClipBoard() {
    Helper.copyToClipBoard(this.modelValue);
  }
}
</script>
