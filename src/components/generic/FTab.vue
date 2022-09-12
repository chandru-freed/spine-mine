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
        v-for="(tab, tabIndx) in tabList"
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

@Component
export default class FTab extends Vue {
  activeTab = 0;

  @Prop()
  tabList: any[] = [];

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
}
</script>
