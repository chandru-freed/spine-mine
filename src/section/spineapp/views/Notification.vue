<template>
  <v-row>
    <v-col>
      <v-card class="mx-auto" outlined>
        <v-toolbar color="primary" dark flat dense>
          <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

          <v-toolbar-title >Notifications</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-chip small color="secondary" >8 NEW</v-chip>
           <f-btn class="mx-3" label="Mark All Read" small outlined ></f-btn>
          <!-- <v-spacer></v-spacer> -->

          <!-- <v-btn x-small rounded outlined>
          Mark All Read
        </v-btn> -->
        </v-toolbar>
        <v-divider></v-divider>

        <v-list two-line class="mt-0 pt-0">
          <v-list-item-group
            v-model="selected"
            active-class="secondary--text"
            multiple
          >
            <template v-for="(item, index) in items">
              <v-list-item :key="item.title">
                <template v-slot:default="{ active }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>

                    <v-list-item-subtitle
                      class="text--primary"
                      v-text="item.headline"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle
                      v-text="item.subtitle"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text
                      v-text="item.action"
                    ></v-list-item-action-text>

                    <v-icon v-if="!active" color="grey lighten-1">
                      mdi-star-outline
                    </v-icon>

                    <v-icon v-else color="yellow darken-3"> mdi-star </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index < items.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
        
      </v-card>
    </v-col>
  </v-row>
  
</template>
<script>

import FBtn from '@/components/generic/FBtn.vue';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components:{
    "f-btn":FBtn
  }
})
export default class Notification extends Vue {
  selected = [0,1,2,3];
  items = [
    {
      action: '15 min',
      headline: 'Brunch this weekend?',
      subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      title: 'Ali Connors',
      new: true,
    },
    {
      action: '2 hr',
      headline: 'Summer BBQ',
      subtitle: `Wish I could come, but I'm out of town this weekend.`,
      title: 'me, Scrott, Jennifer',
      new: true,
    },
    {
      action: '6 hr',
      headline: 'Oui oui',
      subtitle: 'Do you have Paris recommendations? Have you ever been?',
      title: 'Sandra Adams',
      new: true,
    },
    {
      action: '12 hr',
      headline: 'Birthday gift',
      subtitle:
        'Have any ideas about what we should get Heidi for her birthday?',
      title: 'Trevor Hansen',
      new: true,
    },
    {
      action: '18hr',
      headline: 'Recipe to try',
      subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      title: 'Britta Holt',
      new: true,
    },
    {
      action: '18hr',
      headline: 'Recipe to try',
      subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      title: 'Britta Holt',
    },
    {
      action: '18hr',
      headline: 'Recipe to try',
      subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      title: 'Britta Holt',
    },
    {
      action: '18hr',
      headline: 'Recipe to try',
      subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      title: 'Britta Holt',
    },
    {
      action: '18hr',
      headline: 'Recipe to try',
      subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      title: 'Britta Holt',
    },
    {
      action: '18hr',
      headline: 'Recipe to try',
      subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      title: 'Britta Holt',
    },
    {
      action: '18hr',
      headline: 'Recipe to try',
      subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      title: 'Britta Holt',
    },
    {
      action: '18hr',
      headline: 'Recipe to try',
      subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      title: 'Britta Holt',
    },
    {
      action: '18hr',
      headline: 'Recipe to try',
      subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      title: 'Britta Holt',
    }
  ];
}
</script>
