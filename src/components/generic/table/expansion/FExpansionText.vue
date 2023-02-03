
<template>
  <div>
    <span class="overline">  
      {{ selectModel(modelValue, dataSelectorKey) || "--" }}
    </span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FExpansionText extends ModelVue {

}
</script>
