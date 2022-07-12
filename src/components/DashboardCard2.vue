<template>
    <v-card
    max-width="450"
    class="mx-auto"
  >
    
    <v-toolbar
      color="transparent"
      dense
      flat
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>Today</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn> -->
      <v-btn text small color="grey">
        View All
      </v-btn>
    </v-toolbar>
    <v-list two-line>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          link
          v-else
          :key="item.title"
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <!-- <v-btn icon>
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn> -->
            <span class="text-subtitle-1 secondary--text font-weight-medium">40%</span>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script>

  export default {
    name: 'DashboardCard2',
    data: () => ({
      items: [
        // { header: 'TODAY' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'John Doe',
          subtitle: `<span class="text--primary">1,23,456</span> &mdash; 23,000`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Mike Doe',
          subtitle: `<span class="text--primary">1,23,456</span> &mdash; 23,000`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Djokovic',
          subtitle: `<span class="text--primary">1,23,456</span> &mdash; 23,000`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Nadal',
          subtitle: `<span class="text--primary">1,23,456</span> &mdash; 23,000`,
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Federer',
          subtitle: `<span class="text--primary">1,23,456</span> &mdash; 23,000`,
        },
      ],
    }),
  }
</script>