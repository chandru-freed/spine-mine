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
        
        v-for="(tab) in tabList"
        :key="tab.tabName"
      >
        {{ tab.tabName }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab" class=" col-12">
        <v-tab-item v-for="(tab) in tabList"  :key="tab.tabName">
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
import TicketComment from "@/section/spineapp/views/ticket/details/TicketComment.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import FDataTable from "./FDataTable.vue";
import FDataTableMDP from "./FDataTableMDP";
import FForm from "./form/FForm.vue";
import ModelVue from "./ModelVue";

@Component({
    components: {
        TicketComment,
        FForm,
        FDataTable
    }
})
export default class FFooTab extends ModelVue {
  activeTab = 1;

  @Prop({default: () => []})
  tabList: any[];

  mounted() {
    
  }

  goto(routerName: string) {
    if (this.$route.name === routerName) {
      // do nothing
    } else {
      this.$router.push({ name: routerName });
    }
  }
}
</script>
