<template>
    <v-btn v-bind="$props" @click="onClick" >{{label}}</v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { VBtn } from "vuetify/lib";
@Component({
  components: {
    "v-btn": VBtn,
  },
})
export default class FBtn1 extends VBtn {

  @Prop({ default: "" })
  public label!: string;

  @Prop({})
  public onClick!: object;

}
</script>
