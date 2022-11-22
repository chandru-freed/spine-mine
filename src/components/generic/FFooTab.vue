

<template>
    <v-card>
      <template>
          <v-toolbar flat dense>
            <v-tabs
              dense
              v-model="tab"
              background-color="transparent"
              color="secondary"
            >
              <v-tab> SPA Schedule </v-tab>
              <v-tab> Fee Schedule </v-tab>
            </v-tabs>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in 3"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card flat>
          sdsdsd
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class FFooTab extends Vue {
  activeTab = 0;

  @Prop({default: []})
  tabList: any[];
}
</script>
