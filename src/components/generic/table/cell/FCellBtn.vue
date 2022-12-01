
<template>
    <v-btn
          text
          :color="color"
          @click="onClick(modelValue)"
          >{{selectModel(modelValue,dataSelectorKey)}}
        </v-btn>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {
  },
})
export default class FColumnBtn extends ModelVue {
 
  @Prop()
  onClick: (item: any) => void;

  @Prop({
    default: "green"
  })
  color: string;
  
  @Prop()
  dataSelectorKey: () => void;
}
</script>
