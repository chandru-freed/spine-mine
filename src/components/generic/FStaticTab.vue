<template>
  <div>
    <v-tabs
      background-color="transparent"
      flat
      color="secondary"
      centered
      v-model="activeTab"
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab
        :active="activeTab === tabIndx"
        v-for="(tab, tabIndx) in tabMetaDataList"
        :key="tab.tabName"
      >
        {{ tab.tabName }}
        <!-- <v-icon>mdi-phone</v-icon> -->
      </v-tab>
    </v-tabs>


    <v-tabs-items v-model="activeTab" class=" col-12">
        <v-tab-item v-for="(tab) in tabMetaDataList"  :key="tab.tabName">
         <component
              :ref="tab.tabContent.myRefName"
              :is="tab.tabContent.componentName"
              :value="selectModel(modelValue, tab.tabContent.dataSelectorKey)"
              @input="
                (newValue) =>
                  updateModel(
                    modelValue,
                    newValue,
                    tab.tabContent.dataSelectorKey
                  )
              "
              v-bind="tab.tabContent.props"
            />
        </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store, * as Store from '@/../src-gen/store';
import * as Data from "@/../src-gen/data";

import * as Action from "@/../src-gen/action";
import smileRouter from "@/../src-gen/smile-router";
import RouterUtil from "@/router/RouterUtil";
import FDataTable from "./table/FDataTable.vue";
import ModelVue from "./ModelVue";


@Component({
    components:{
        FDataTable
    }
})
export default class FStaticTab extends ModelVue {
  activeTab = 0;

  @Prop({default: () => []})
  tabMetaDataList: any[];

  @Store.Getter.Login.LoginDetails.roleList
  loggedInUserRoleList: string[];

  mounted() {
  }

}
</script>
