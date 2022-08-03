<template>
  <v-card>
    <v-row>
      <v-col col="12">
        <v-card outlined>
          <component
            :ref="budgetRelevantFormMetaData.myRef"
            :is="budgetRelevantFormMetaData.componentName"
            :value="modelValue[budgetRelevantFormMetaData.dataSelectorKey]"
            v-bind="budgetRelevantFormMetaData.props"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <template v-if="!!budgetFormMetaData.dataSelectorKey">
        <component
          :ref="budgetFormMetaData.myRef"
          :is="budgetFormMetaData.componentName"
          v-model="modelValue[budgetFormMetaData.dataSelectorKey]"
          v-bind="budgetFormMetaData.props"
        />
      </template>
      <template v-if="!budgetFormMetaData.dataSelectorKey">
        <component
          :ref="budgetFormMetaData.myRef"
          :is="budgetFormMetaData.componentName"
          v-model="modelValue"
          v-bind="budgetFormMetaData.props"
        />
      </template>
    </v-row>
    <v-row>
      <v-col class="mx-6">
        <FCurrencyField
          type="number"
          disabled
          :label="`Total Income`"
          outlined
          dense
          :value="totalIncome"
        ></FCurrencyField>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import FForm from "@/components/form/FForm.vue";
import FBtn from "@/components/FBtn.vue";
import ModelVue from "@/components/ModelVue";
import FCurrencyField from "@/components/form/field/FCurrencyField.vue";
@Component({
  components: {
    FForm,
    FCurrencyField,
    FBtn,
  },
})
export default class CollectClientInfoTaskStep3 extends ModelVue {
  @Prop()
  budgetRelevantFormMetaData: any;

  @Prop()
  budgetFormMetaData: any;

  @Prop()
  dataSelectorKey: string;

  get totalIncome() {
    return (
      Object.values(this.modelValue.budgetInfo.incomeSources) as number[]
    ).reduce<number>((accumulator, obj: number) => {
      return accumulator + obj;
    }, 0);
  }
}
</script>
