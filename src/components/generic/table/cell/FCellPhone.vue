<template>
  <div>
    <v-list-item-subtitle v-if="!!selectModel(modelValue ,dataSelectorKey)" class="text--secondary text-body-1"> {{selectModel(modelValue ,dataSelectorKey)| phone}}</v-list-item-subtitle>
    <div v-else>--</div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FCellPhone extends ModelVue {
  @Prop()
  dataSelectorKey: string;

}
</script>
