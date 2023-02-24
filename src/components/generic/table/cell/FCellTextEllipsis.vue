<template>
  <v-tooltip bottom max-width="200">
    <template v-slot:activator="{ on, attrs }">
      <div class="elip" v-bind="attrs" v-on="on">
        {{ selectModel(modelValue, dataSelectorKey)|| "--" | truncate(12) }}
      </div>
    </template>
    <span>{{ selectModel(modelValue, dataSelectorKey) || "--" }}</span>
  </v-tooltip>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FCellTextEllipsis extends ModelVue {}
</script>
<style scoped>
.elip {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>