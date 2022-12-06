<template>
  <v-btn text :color="color" @click="gotoTask()">
    {{ selectModel(modelValue, dataSelectorKey) }}
  </v-btn>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FCellTask extends ModelVue {
  // @Prop()
  // onClick: (item: any) => void;

  @Prop({
    default: "green",
  })
  color: string;

  @Prop()
  dataSelectorKey: string;

  gotoTask() {
    this.$router.push({
      name: "Root.CFTaskRedirect",
      params: { clientFileNumber: this.modelValue.cid, taskId: this.modelValue.taskId },
    });
  }
}
</script>
