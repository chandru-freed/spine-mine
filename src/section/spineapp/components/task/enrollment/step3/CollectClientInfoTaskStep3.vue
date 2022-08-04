<template>
  <v-card flat color="transparent">
    <v-row no-gutters>
      <v-col col="12">
        <v-card outlined>
          <component
            :ref="profileFormMetaData.myRef"
            :is="profileFormMetaData.componentName"
            :value="modelValue[profileFormMetaData.dataSelectorKey]"
            v-bind="profileFormMetaData.props"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
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
      <v-col>
        <v-card outlined>
          <v-card-text>
            <FCurrencyField
              disabled
              :label="`Total Income`"
              outlined
              dense
              :value="totalIncome"
            ></FCurrencyField>
          </v-card-text>
          <v-card-actions>
            <v-row no-gutters>
              <v-col
                v-for="(actionMetaData, index) in actionListMetaData"
                :key="index"
                :class="actionMetaData.boundaryClass"
              >
                <component
                  name="index"
                  :is="actionMetaData.componentName"
                  v-bind="actionMetaData.props"
                >
                </component>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
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
  profileFormMetaData: any;

  @Prop()
  budgetFormMetaData: any;

  @Prop()
  actionListMetaData: any;

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
