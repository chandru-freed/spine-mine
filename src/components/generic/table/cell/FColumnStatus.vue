<template>
  <v-chip v-if="selectModel(modelValue,dataSelectorKey)" small outlined>
    {{selectModel(modelValue,dataSelectorKey)}}
  </v-chip>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {
  },
})
export default class FColumnStatus extends ModelVue {
  @Prop()
  dataSelectorKey: () => void;
}
</script>
