<template>
  <span class="grey--text">
    {{ selectModel(modelValue, dataSelectorKey) | datetime }} ({{
      selectModel(modelValue, dataSelectorKey) | fromNow
    }})
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FCellDateTime extends ModelVue {
  @Prop()
  dataSelectorKey: () => void;
}
</script>
