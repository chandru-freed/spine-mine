<template>
    <v-alert
      dense
      outlined
      text
      :color="color"
      class="ma-2"
    >
      <div
        class="d-flex flex-row align-start flex-wrap justify-space-around pa-2"
      >
        <div class="my-1">{{message}}</div>
        <v-spacer />
        <v-btn
          @click="() => $emit('cancelClick')"
          outlined
          :color="color"
          class="mx-2"
          >Cancel</v-btn
        >
        <v-btn @click="() => $emit('confirmClick')" outlined :color="color" class="mx-2">
          Confirm
        </v-btn>
      </div>
    </v-alert>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { VBtn } from "vuetify/lib/components";

@Component
export default class FAlert extends Vue {
  @Prop({
    default: "Are you sure want to proceed",
  })
  message: string;

  @Prop({
    default: "warning",
  })
  color: string;

}
</script>