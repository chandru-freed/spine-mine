<template>
  <v-stepper v-model="selectedStep" flat non-linear>
    <v-stepper-header flat>
      <v-stepper-step
        editable
        :complete="selectedStep > stepIndx"
        :step="stepIndx"
        v-for="(step, stepIndx) in stepMetaDataList"
        :key="stepIndx"
      >
        {{ step.props.name }}
      </v-stepper-step>
    </v-stepper-header>
    {{ value }}
    <v-stepper-items>
      <v-stepper-content
        class="pa-4"
        :step="stepIndx"
        v-for="(step, stepIndx) in stepMetaDataList"
        :key="stepIndx"
      >
        <v-card color="grey lighten-5" flat min-height="600">
          <v-card-text class="pb-0">
            <template v-if="!!step.props.component.dataSelectorKey">
              <component
                :ref="step.props.component.myRef"
                :is="step.props.component.componentName"
                v-model="modelValue[step.props.component.dataSelectorKey]"
                v-bind="step.props.component.props"
              />
            </template>
            <template v-if="!step.props.component.dataSelectorKey">
              <component
                :ref="step.props.component.myRef"
                :is="step.props.component.componentName"
                v-model="modelValue"
                v-bind="step.props.component.props"
              />
            </template>
          </v-card-text>
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import FForm from "./form/FForm.vue";

import ModelVue from "@/components/ModelVue";


@Component({
  components: {
    FForm
  },
})
export default class FStepper extends ModelVue {
  @Prop({
    default: () => {
      return [];
    },
  })
  stepMetaDataList!: any[];

  selectedStep = 0;
}
</script>
