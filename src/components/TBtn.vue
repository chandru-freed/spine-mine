<template>
    <v-btn v-bind="$props" @click="actionClick" >{{label}}</v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { VBtn } from "vuetify/lib";
@Component({
  components: {
    "v-btn": VBtn,
  },
})
export default class TBtn extends VBtn {

  @Prop({ default: "" })
  public label!: string;

  @Prop({
    default: () => {
      return {};
    },
  })
  public actionObj!: object;

  @Prop({
    default: () => {
      return {};
    },
  })
  public actionClick!: object;
}
</script>
