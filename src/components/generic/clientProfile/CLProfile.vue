<template>
  <div ref="creditorListRef">
    <v-col class="col-12">
      <div v-for="formMetaData in formMetaDataList" :key="formMetaData.myRefName">
        <component
          :ref="formMetaData.myRefName"
          :is="formMetaData.componentName"
          :value="selectModel(modelValue, formMetaData.dataSelectorKey)"
          @input="(newValue) => updateModel(modelValue, newValue, formMetaData.dataSelectorKey)"
          v-bind="formMetaData.props"
        ></component>
      </div>
      <!--ACTION START-->
      <div
        class="d-flex flex-row align-start flex-wrap justify-space-around pa-2 my-5"
        v-if="!disabled"
      >
        <component
          v-for="(actionMetaData, index) of actionMetaDataListFiltered"
          :key="'action' + index"
          :is="actionMetaData.componentName"
          :ref="actionMetaData.myRefName"
          v-bind="actionMetaData.props"
        ></component>
      </div>
      <!--ACTION END-->
    </v-col>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import FForm from "@/components/generic/form/FForm.vue";
import ModelVue from "@/components/generic/ModelVue";
import FBtn from "@/components/generic/FBtn.vue";
@Component({
  components: {
    FForm,
    FBtn,
  },
})
export default class CCITProfile extends ModelVue {
  @Prop()
  formMetaDataList: any[];

  @Prop()
  actionMetaDataList: any[];

  @Prop()
  taskRoot: any;


  get actionMetaDataListFiltered() {
    return this.actionMetaDataList.filter(
      (actionMetaData) =>
        actionMetaData.condition === undefined ||
        actionMetaData.condition === true
    );
  }


}
</script>

<style></style>
