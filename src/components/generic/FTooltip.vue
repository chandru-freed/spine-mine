<template>
  <div>
    <v-tooltip bottom max-width="300">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" small icon class="pa-0">
          <v-icon color="secondary" small> {{ icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ tooltipText }}</span>
    </v-tooltip>
  </div>
</template>
<script lang="ts">
import FSnackbar from "@/fsnackbar";
import Helper from "@/section/spineapp/util/Helper";
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "./ModelVue";

@Component({
  components: {},
})
export default class FTooltip extends ModelVue {
  @Prop({
    default: "Click here to copy",
  })
  tooltipText: string;

  @Prop()
  icon: string;
}
</script>
