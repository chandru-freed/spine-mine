<template>
  <div>
    <v-tabs
      background-color="transparent"
      flat
      color="secondary"
      centered
      :value="activeTab"
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab
        :active="activeTab === tabIndx"
        @click="goto(tab.routerName)"
        v-for="(tab, tabIndx) in filteredTabList"
        :key="tab.tabName"
      >
        {{ tab.tabName }}
        <!-- <v-icon>mdi-phone</v-icon> -->
      </v-tab>
    </v-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import store, * as Store from '@/../src-gen/store';
import * as Data from "@/../src-gen/data";

import * as Action from "@/../src-gen/action";
import smileRouter from "@/../src-gen/smile-router";
import RouterUtil from "@/router/RouterUtil";


@Component
export default class FTab extends Vue {
  activeTab = 0;

  @Prop({default: []})
  tabList: any[];

  @Store.Getter.Login.LoginDetails.roleList
  roleList: string[];

  mounted() {
    const ret = this.tabList
      .map((tab) => tab.routerName)
      .indexOf(this.$route.name!);
    this.activeTab = ret;
  }

  goto(routerName: string) {
    if (this.$route.name === routerName) {
      // do nothing
    } else {
      this.$router.push({ name: routerName });
    }
  }
  get filteredTabList() {
    return this.tabList.filter(item => {
      const routeRoleList = RouterUtil.getUserRolesForRoute(item.routerName);
      if(routeRoleList.length>0) {
        return this.roleList.some((role: any) => {
          // return routeRoleList.includes(role)
        });
      } else {
        return true
      }
    });
  }
}
</script>
