
<template>
  <v-menu
    offset-y
    left
    nudge-bottom="14"
    min-width="230"
    content-class="user-profile-menu-content"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        top
        color="secondary"
        overlap
        offset-x="14"
        offset-y="14"
        class="ms-4"
        dot
      >
        <v-avatar
          size="40px"
          v-bind="attrs"
          v-on="on"
        >
          <!-- <v-img :src="require('@/assets/images/avatars/1.png')"></v-img> -->
          <v-icon>mdi-bell</v-icon>
        </v-avatar>
      </v-badge>
    </template>
    <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-toolbar
      color="grey lighten-4"
      flat
      dense
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>Notifications</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-chip small color="secondary" outlined>8 NEW</v-chip>
      <!-- <v-spacer></v-spacer> -->

      

      <!-- <v-btn x-small rounded outlined>
        Mark All Read
      </v-btn> -->
    </v-toolbar>
    <v-divider></v-divider>

    <v-list two-line>
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

                <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>

                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                >
                  mdi-star-outline
                </v-icon>

                <v-icon
                  v-else
                  color="yellow darken-3"
                >
                  mdi-star
                </v-icon>
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
    <v-card-text>
      <f-btn label="Mark All Read" block outlined color="grey"></f-btn>
    </v-card-text>
  </v-card>
  </v-menu>
</template>
<script >
import { Vue, Component } from 'vue-property-decorator'
import FBtn from './generic/FBtn.vue'

@Component({
  components:{
    "f-btn":FBtn
  }
})
export default class AppBarNotificationMenu extends Vue { 

    selected = [2]
    items = [
        {
          action: '15 min',
          headline: 'Brunch this weekend?',
          subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
          title: 'Ali Connors',
        },
        {
          action: '2 hr',
          headline: 'Summer BBQ',
          subtitle: `Wish I could come, but I'm out of town this weekend.`,
          title: 'me, Scrott, Jennifer',
        },
        {
          action: '6 hr',
          headline: 'Oui oui',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
          title: 'Sandra Adams',
        },
        {
          action: '12 hr',
          headline: 'Birthday gift',
          subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
          title: 'Trevor Hansen',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          title: 'Britta Holt',
        },
      ]
    

}
</script>
