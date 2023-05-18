<template>
  <v-card flat class="py-1 ">
    <v-pagination
      :value="modelValue"
      :length="paginationLength"
      :total-visible="10"
      @input="(newVal) => (modelValue = newVal)"
    ></v-pagination>
  </v-card>
</template>
<script lang="ts">
import Helper from "@/section/spineapp/util/Helper";
import { Component, Prop } from "vue-property-decorator";
import { VPagination } from "vuetify/lib";
import { VBtn } from "vuetify/lib/components";
import ModelVue from "./ModelVue";

@Component({
  components: {},
})
export default class FPagination extends ModelVue {
  @Prop({ default: 0 })
  paginationLength: number;

  @Prop({ default: 10 })
  count: number;

  page: number = 1;

  mounted() {}

  get modelValue() {
    let offset = 1;
    if (this.value > 0) {
      offset = Math.ceil((this.value + 1) / this.count);
    }
    return offset;
  }

  set modelValue(newVal: number) {
    const offset = (newVal - 1) * this.count;
    this.$emit("input", offset);
  }
}
</script>
