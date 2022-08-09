<template>
  <v-btn v-bind="$props" @click="onClick">{{ label }}</v-btn>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { VBtn } from "vuetify/lib/components";

@Component({
  components: {
    VBtn,
  },
})
export default class FBtn extends VBtn {
  @Prop()
  label: string;

  @Prop()
  onClick: () => void;
}
</script>
