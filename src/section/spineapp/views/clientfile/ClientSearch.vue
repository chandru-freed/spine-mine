<template>
<div>
<v-tabs background-color="transparent" flat color="secondary" centered v-model="activeTab">
    <v-tabs-slider></v-tabs-slider>  
    <v-tab :disabled="activeTab === tabIndx" v-for="(tab,tabIndx) in tabList" :key="tab.tabName">
      {{tab.tabName}}
      <!-- <v-icon>mdi-phone</v-icon> -->
    </v-tab> 
  </v-tabs>
  <v-divider></v-divider>
    <v-tabs-items v-model="activeTab" flat>
      <v-tab-item v-for="item in tabList" :key="item.tabName">
        <v-card flat min-height="700">
          <component :is="item.component"></component>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
   </div> 
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
// import store, * as Store from '@/../src-gen/store';
// import * as Data from '@/../src-gen/data';
// import * as ServerData from '@/../src-gen/server-data';
// import * as Action from '@/../src-gen/action';
import FileInfo from "@/section/spineapp/components/file/FileInfo.vue";
import FileProfile from "@/section/spineapp/components/file/profile/FileProfile.vue";
import ClientList from "@/section/spineapp/views/clientfile/ClientList.vue";
@Component({
  components: {
    "file-info": FileInfo,
    "file-profile": FileProfile,
    ClientList
  },
})
export default class ClientSearch extends Vue {
  activeTab = 0;

  tabList = [
    {
      tabName: "Client",
      component: "ClientList",
    },
    {
      tabName: "File",
      component: "",
    },
  ];

  // mounted() {
  //   const ret = this.tabList.map(tab => tab.routerName).indexOf(this.$route.name!)
  //   this.activeTab = ret
  // }
}
</script>

<style>
</style>
