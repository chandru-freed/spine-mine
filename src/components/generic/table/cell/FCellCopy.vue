<template>
  <div>
    {{ selectModel(modelValue, dataSelectorKey) || "--" }}
    <v-tooltip bottom max-width="300">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" small @click="copyToClipBoard" icon
          ><v-icon small>mdi-content-copy</v-icon>
        </v-btn>
      </template>
      <span>{{ tooltipText }}</span>
    </v-tooltip>
    <!-- <v-btn v-bind="props" small @click="copyToClipBoard" icon><v-icon small >mdi-content-copy</v-icon>
    
    </v-btn> -->
  </div>
</template>
<script lang="ts">
import FSnackbar from "@/fsnackbar";
import Helper from "@/section/spineapp/util/Helper";
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FCellCopy extends ModelVue {
  @Prop()
  dataSelectorKeyToCopy: string;

  @Prop()
  dataSelectorKey: string;

  @Prop({
    default: "Click here to copy",
  })
  tooltipText: string;

  copyToClipBoard() {
    const textToCopy = this.dataSelectorKeyToCopy
      ? this.modelValue[this.dataSelectorKeyToCopy]
      : this.modelValue[this.dataSelectorKey];
    Helper.copyToClipBoard(textToCopy);
  }
}
</script>
