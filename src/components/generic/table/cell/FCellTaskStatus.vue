<template>
  <div>
    <v-icon color="grey" v-if="modelValue.taskState === 'CREATED'"
      >mdi-plus-circle-outline</v-icon
    >
    <v-icon color="secondary" v-if="modelValue.taskState === 'ALLOCATED'"
      >mdi-account-circle-outline</v-icon
    >
    <v-icon color="primary" v-if="modelValue.taskState === 'STARTED'"
      >mdi-pencil-circle-outline</v-icon
    >
       <v-icon color="primary" v-if="modelValue.taskState === 'PARTIALLY_COMPLETED'"
      >mdi-pencil-circle-outline</v-icon
    >
    <v-icon color="primary" v-if="modelValue.taskState === 'SAVED'"
      >mdi-progress-pencil</v-icon
    >

    <v-icon color="success" v-if="modelValue.taskState === 'COMPLETED'"
      >mdi-check-circle-outline</v-icon
    >

    <v-icon color="grey" v-if="modelValue.taskState === 'CANCELLED'"
      >mdi-cancel</v-icon
    >
    <v-icon
      color="red"
      v-if="modelValue.taskState === 'EXCEPTION_Q' || modelValue.taskState === 'EXIT_Q'"
      >mdi-alert-circle</v-icon
    >
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ModelVue from "../../ModelVue";

@Component({
  components: {},
})
export default class FCellTaskStatus extends ModelVue {
  @Prop()
  dataSelectorKey: string;
}
</script>
